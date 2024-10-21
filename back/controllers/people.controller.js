const { json } = require("body-parser");
const { insertLogType, insertAddress, insertPeople, checkMail, checkPassword, peopleInformation, getAllUsers,getUserFromId, deleteUserOfId,updateFromId, checkPeople, getLogtypeFromId} = require("./queries");
const jwt = require("jsonwebtoken");

class PeopleController {
  static async signup(req, res) {
    const {
      firstNamePeople,
      namePeople,
      mailPeople,
      passwordPeople,
      phoneNumberPeople,
      city,
      postalCode,
      logTypeLvl,
    } = req.body;

    if (
      !(firstNamePeople &&
      namePeople &&
      mailPeople &&
      passwordPeople &&
      city &&
      postalCode &&
      logTypeLvl
      )
    ) {
      return res.status(400).send("Champs manquants");
    }

    if (await checkMail(mailPeople)){
      return res.status(409).send("Un autre compte est déjà enregisté à cette adresse email")
    }

    try {
      const resultsLogType = await insertLogType(logTypeLvl);
      const resultsAddress = await insertAddress(city, postalCode);
      const resultsPeople = await insertPeople(
        firstNamePeople,
        namePeople,
        mailPeople,
        passwordPeople, 
        phoneNumberPeople,
        resultsAddress.insertId,
        resultsLogType.insertId
      );

      return res.status(201).json({
        logTypeId: resultsLogType.insertId,
        addressId: resultsAddress.insertId,
        peopleId: resultsPeople.insertId,
      });
    } catch (error) {
      return res.status(500).json({error});
    }
  }

  static async login(req , res) {
    const {mailPeople, passwordPeople} = req.body
    if (!(mailPeople || passwordPeople))
    {
      return res.status(400).send("champs manquants");
    }

    const mail = await checkMail(mailPeople);
    if (!mail)
    {
      return res.status(409).send("pas de mail");
    }

    const passwordCheck = await checkPassword(mailPeople,passwordPeople);
    if (!passwordCheck)
    {
      return res.status(401).send("mauvais mdp");
    }
    
    try {
      const people = await peopleInformation(mailPeople);
      const peopleToken = people[0];
      console.log(peopleToken);
      const token = jwt.sign({peopleToken}, 'key', {
        expiresIn: '1h',
        });
      res.status(200).json({token})
    } catch (error) {
      res.status(500).json({ error: 'erreur login' });
    }
  }

  static async getUsers(req, res) {
    try {
      const allPeople = await getAllUsers();
      res.status(200).json({allPeople})
    } catch (error) {
      res.status(500).json({error: 'all People'});
    }
  }

  static async getUserById(req,res) {
    const peopleId = req.params['id'];
    if (!peopleId)
    {
      return res.status(400).send("champs manquants");
    }
    try {
      const user = await getUserFromId(peopleId);
      res.status(200).json({user})
    } catch (error) {
      res.status(500).json({error: 'personnes inéxistantes dans la bdd'});
    }
  }

  static async getLogTypeById(req,res) {
    const logTypeId = req.params['id'];
    console.log(logTypeId)
    if (!logTypeId)
    {
      return res.status(400).send("champs manquants");
    }
    const logtype = await getLogtypeFromId(logTypeId);
    try {
      res.status(200).json({logtype})
    } catch (error) {
      res.status(500).json({error: 'logtype inéxistantes dans la bdd'});
    }
  }

  static async deleteUserById(req,res) {
    const peopleId = req.params['id'];
    if (!peopleId)
    {
      return res.status(400).send("champs manquants");
    }
    try {
      const user = await deleteUserOfId(peopleId);
      res.status(200).json({user, status : "supprimé"})
    } catch (error) {
      res.status(500).json({error: 'utilisateur non trouvé'});
    }
  }

  static async updateUserById(req,res) {
    const peopleId = req.params['id'];
    if (!peopleId)
      {
        return res.status(400).send("champs manquants");
      }
    if (!checkPeople(peopleId)){
      return res.status(400).send("id inéxistant dans la bdd");
    }
    const valueNameList = [];
    const valueList = [];
    const allowUpdater = ["firstNamePeople","namePeople","mailPeople","phoneNumberPeople","passwordPeople"];
    try {
      for (let valueToUpdate of allowUpdater)
        {
          if (valueToUpdate in req.body)
          {
            valueNameList.push(`${valueToUpdate}= ?`);
            valueList.push(req.body[valueToUpdate]);
          }
        }
      const update = await updateFromId(peopleId, valueNameList , valueList);
      res.status(200).json({update});
    } catch (error) {
      res.status(500).json({error: "impossible d'update"});
    }
  }


}

module.exports = PeopleController;
