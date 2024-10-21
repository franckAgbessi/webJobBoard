const { checkMailApplication, insertApplication, getAdvertisementFromId, checkApplication, updateApplicationyFromId, getAllApplications, getApplicationFromId, deleteApplicationOfId } = require("./queries");

class ApplicationsController {
  static async createApplication(req, res) {
    const { firstNameApply, nameApply, mailApply, messageApply } = req.body;

    if (!(firstNameApply && nameApply && mailApply && messageApply)) {
      return res.status(400).send("Champs manquants");
    }
    try {
      const application = await insertApplication(
        firstNameApply,
        nameApply,
        mailApply,
        messageApply
      );

      return res.status(201).json({ status: "create", application: req.body });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error });
    }
  }
  static async deleteApplicationById(req,res) {
    const applicationId = req.params['id'];
    console.log(applicationId)
    if (!applicationId)
    {
      return res.status(400).send("champs manquants");
    }
    try {
        const application = await deleteApplicationOfId(applicationId)
      res.status(200).json({application, status : "supprimé"})
    } catch (error) {
      res.status(500).json({error: 'application non trouvé'});
    }
  }

  static async getApplicationById(req,res) {
    const applicationId = req.params['id'];
    if (!applicationId)
    {
      return res.status(400).send("champs manquants");
    }
    try {
      const application = await getApplicationFromId(applicationId);
      res.status(200).json({application})
    } catch (error) {
      res.status(500).json({error: 'appication inéxistantes dans la bdd'});
    }
  }

  static async updateApplicationById(req,res) {
    const applicationId = req.params['id'];
    if (!applicationId)
      {
        return res.status(400).send("champs manquants");
      }
    if (!checkApplication(applicationId)){
      return res.status(400).send("id inéxistant dans la bdd");
    }
    const valueNameList = [];
    const valueList = [];
    const allowUpdater = ["firstNameApply","nameApply","mailApply","messageApply"];
    for (let valueToUpdate of allowUpdater)
        {
          if (valueToUpdate in req.body)
          {
            valueNameList.push(`${valueToUpdate}= ?`);
            valueList.push(req.body[valueToUpdate]);
          }
        }
        const update = await updateApplicationyFromId(applicationId, valueNameList , valueList);
    try {
      res.status(200).json({update});
    } catch (error) {
      res.status(500).json({error: "impossible d'update"});
    }
  } 

  static async getApplications(req, res) {
    try {
      const applications = await getAllApplications();
      res.status(200).json({applications})
    } catch (error) {
      res.status(500).json({error: 'all companies'});
    }
  }
}

module.exports = ApplicationsController;
