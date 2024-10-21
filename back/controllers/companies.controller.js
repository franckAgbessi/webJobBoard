const { checkMailCompany, insertCompany, getAllCompanies, deleteCompanyOfId, checkCompany,updateCompanyFromId ,getCompanyFromId} = require("./queries");

class CompaniesController {
  static async companyRegister(req, res) {
    const {
      nameCompany,
      mailCompany,
      phoneNumberCompany,
      descriptionCompany
    } = req.body;

    if (!(nameCompany && mailCompany && phoneNumberCompany)) {
      return res.status(400).send("Champs manquants");
    }


    if (await checkMailCompany(mailCompany)) {
      return res
        .status(409)
        .send("Une autre entreprise est déjà enregisté à cette adresse email");
    }

    try {
      const company = await insertCompany(nameCompany,mailCompany,phoneNumberCompany,descriptionCompany);
      return res.status(201).json({company : req.body});
    } catch (error) {
      console.error(error);
      return res.status(500).json({error});
    }
  }

  static async deleteCompanyById(req,res) {
    const companyId = req.params['id'];
    console.log(companyId)
    if (!companyId)
    {
      return res.status(400).send("champs manquants");
    }
    try {
      const company = await deleteCompanyOfId(companyId);
      res.status(200).json({company, status : "supprimé"})
    } catch (error) {
      res.status(500).json({error: 'company non trouvé'});
    }
  }

  static async getCompanyById(req,res) {
    const companyId = req.params['id'];
    console.log(companyId)
    if (!companyId)
    {
      return res.status(400).send("champs manquants");
    }
    try {
      const company = await getCompanyFromId(companyId);
      res.status(200).json({company})
    } catch (error) {
      res.status(500).json({error: 'Company inéxistantes dans la bdd'});
    }
  }

  static async updateCompanyById(req,res) {
    const companyId = req.params['id'];
    if (!companyId)
      {
        return res.status(400).send("champs manquants");
      }
    if (!checkCompany(companyId)){
      return res.status(400).send("id inéxistant dans la bdd");
    }
    const valueNameList = [];
    const valueList = [];
    const allowUpdater = ["nameCompany" ,"mailCompany","phoneNumberCompany","descriptionCompany"];
    try {
      for (let valueToUpdate of allowUpdater)
        {
          if (valueToUpdate in req.body)
          {
            valueNameList.push(`${valueToUpdate}= ?`);
            valueList.push(req.body[valueToUpdate]);
          }
        }
        const update = await updateCompanyFromId(companyId, valueNameList , valueList);
      res.status(200).json({update});
    } catch (error) {
      res.status(500).json({error: "impossible d'update"});
    }
  }

  static async getCompanies(req, res) {
    try {
      const allCompanies = await getAllCompanies();
      res.status(200).json({allCompanies})
    } catch (error) {
      res.status(500).json({error: 'all companies'});
    }
  }
};

module.exports = CompaniesController;
