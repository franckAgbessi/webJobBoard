const { getAddressFromId } = require("./queries");

class addressController{
    static async getAddressById(req,res) {
        const addressId = req.params['id'];
        if (!addressId)
        {
          return res.status(400).send("champs manquants");
        };
        try {
          const address = await getAddressFromId(addressId)
          res.status(200).json({address})
        } catch (error) {
          res.status(500).json({error: ' address inéxistantes dans la bdd'});
        }
      }
}

module.exports =  addressController;