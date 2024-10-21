const { post } = require("../routes/people.route");
const {
  insertAddress,
  insertAdvertisement,
  insertContract,
  getAllAdvertisements,
  getAdvertisementFromId,
  deleteAdvertisementsOfId,
  updateAdvertisementFromId,
  checkAdvertisement,
  getContractFromId,
} = require("./queries");

class advertisementsController {
  static async advertisementsRegister(req, res) {
    const {
      nameAdvertisement,
      mailAdvertisement,
      descriptionAdvertisement,
      dateAdvertisement,
      city,
      postalCode,
      contractType,
      isRemote,
    } = req.body;

    if (
      !(
        nameAdvertisement &&
        mailAdvertisement &&
        descriptionAdvertisement &&
        dateAdvertisement &&
        city &&
        postalCode &&
        contractType &&
        isRemote
      )
    ) {
      return res.status(400).send("Champs manquants");
    }

    try {
      const contractAdvertisement = await insertContract(
        contractType,
        isRemote
      );
      
      const resultsAddress = await insertAddress(city, postalCode);
      const advertisement = await insertAdvertisement(
        nameAdvertisement,
        mailAdvertisement,
        descriptionAdvertisement,
        dateAdvertisement,
        resultsAddress.insertId,
        contractAdvertisement.insertId
      );
      return res.status(201).json({
        contractTypeId: contractAdvertisement.insertId,
        addressId: resultsAddress.insertId,
        newJobId: advertisement.insertId
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }

  static async getAdvertisements(req, res) {
    try {
      const advertisements = await getAllAdvertisements();
      res.status(200).json({advertisements})
    } catch (error) {
      res.status(500).json({error: 'all advertisements get'});
    }
  }

  static async getAdvertisementById(req,res) {
    const advertisementId = req.params['id'];
    console.log(advertisementId)
    if (!advertisementId)
    {
      return res.status(400).send("champs manquants");
    };
    try {
      const advertisement = await getAdvertisementFromId(advertisementId);
      res.status(200).json({advertisement})
    } catch (error) {
      res.status(500).json({error: ' advertisements inéxistantes dans la bdd'});
    }
  }

  static async deleteAdvertisementById(req,res) {
    const advertisementId = req.params['id'];
    if (!advertisementId)
    {
      return res.status(400).send("champs manquants");
    }
    try {
      const user = await deleteAdvertisementsOfId(advertisementId)
      res.status(200).json({advertisementId, status : "supprimé"})
    } catch (error) {
      res.status(500).json({error: 'advertisement non trouvé'});
    }
  }

  static async updateAdvertisementById(req,res) {
    const advertisementId = req.params['id'];
    if (!advertisementId)
      {
        return res.status(400).send("champs manquants");
      }
    if (!checkAdvertisement(advertisementId)){
      return res.status(400).send("id inéxistant dans la bdd");
    }
    const valueNameList = [];
    const valueList = [];
    const allowUpdater = ["nameAdvertisement","mailAdvertisement","descriptionAdvertisement","contractAdvertisementId"];
    try {
      for (let valueToUpdate of allowUpdater)
        {
          if (valueToUpdate in req.body)
          {
            valueNameList.push(`${valueToUpdate}= ?`);
            valueList.push(req.body[valueToUpdate]);
          }
        }
      const update = await updateAdvertisementFromId(advertisementId, valueNameList , valueList);
      res.status(200).json({update});
    } catch (error) {
      res.status(500).json({error: "impossible d'update"});
    }
  }
  
  static async getContractById(req,res) {
    const contractId = req.params['id'];
    if (!contractId)
    {
      return res.status(400).send("champs manquants");
    }
    try {
      const contract = await getContractFromId(contractId)
      res.status(200).json({contract})
    } catch (error) {
      res.status(500).json({error: 'contrat inéxistantes dans la bdd'});
    }
  }
}

module.exports = advertisementsController;
