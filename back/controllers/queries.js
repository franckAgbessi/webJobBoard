const { json } = require("express");
const DatabaseElement = require("../db");

function getAllUsers() {
  return new Promise((resolve, reject) => {
    DatabaseElement.query("SELECT * FROM `people`", (error, results) => {
      if (error) {
        console.error("Erreur getAllUser");
        reject(error);
      }
      resolve(results);
    });
  });
}

function getAllApplications() {
  return new Promise((resolve, reject) => {
    DatabaseElement.query("SELECT * FROM applications", (error, results) => {
      if (error) {
        console.error("Erreur getAllApp");
        reject(error);
      }
      resolve(results);
    });
  });
}

function getAllAdvertisements() {
  return new Promise((resolve, reject) => {
    DatabaseElement.query(
      "SELECT * FROM `advertisements`",
      (error, results) => {
        if (error) {
          console.error("Erreur getAllAdvertisements");
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

function getAllCompanies() {
  return new Promise((resolve, reject) => {
    DatabaseElement.query("SELECT * FROM `company`", (error, results) => {
      if (error) {
        console.error("Erreur getAllCompany");
        reject(error);
      }
      resolve(results);
    });
  });
}

function getUserFromId(peopleId) {
  return new Promise((resolve, reject) => {
    userIdQuery = "SELECT * FROM people WHERE peopleId = ?";
    DatabaseElement.query(userIdQuery, peopleId, (error, results) => {
      if (error) {
        console.error("Error vérifier user");
        reject(error);
      }
      resolve(results);
    });
  });
}

function getAddressFromId(addressId) {
  return new Promise((resolve, reject) => {
    addressIdQuery = "SELECT * FROM addressOf WHERE addressOfId = ?";
    DatabaseElement.query(addressIdQuery, addressId, (error, results) => {
      if (error) {
        console.error("Error vérifier address");
        reject(error);
      }
      resolve(results);
    });
  });
}

function getCompanyFromId(companyId) {
  return new Promise((resolve, reject) => {
    companyIdQuery = "SELECT * FROM company WHERE companyId = ?";
    DatabaseElement.query(companyIdQuery, companyId, (error, results) => {
      if (error) {
        console.error("Error vérifier company");
        reject(error);
      }
      resolve(results);
    });
  });
}


function getLogtypeFromId(logtypeId) {
  return new Promise((resolve, reject) => {
    const logtypeIdQuery = "SELECT * FROM logType WHERE logTypeId = ?";
    DatabaseElement.query(logtypeIdQuery, logtypeId, (error, results) => {
      if (error) {
        console.error("Error vérifier logtype");
        reject(error);
      }
      resolve(results);
    });
  });
}


function getContractFromId(contractOfId) {
  return new Promise((resolve, reject) => {
    contractIdQuery = "SELECT * FROM contractOf WHERE contractId = ?";
    DatabaseElement.query(contractIdQuery, contractOfId, (error, results) => {
      if (error) {
        console.error("Error vérifier contract");
        reject(error);
      }
      resolve(results);
    });
  });
}

function getApplicationFromId(appicationId) {
  return new Promise((resolve, reject) => {
    appicationIdQuery = "SELECT * FROM applications WHERE applicationId = ?";
    DatabaseElement.query(appicationIdQuery, appicationId, (error, results) => {
      if (error) {
        console.error("Error vérifier company");
        reject(error);
      }
      resolve(results);
    });
  });
}

function getAdvertisementFromId(advertisementId) {
  return new Promise((resolve, reject) => {
    const advertisementIdQuery =
      "SELECT * FROM advertisements WHERE advertisementsId = ?";
    DatabaseElement.query(
      advertisementIdQuery,
      advertisementId,
      (error, results) => {
        if (error) {
          console.error("Error vérifier advertisement");
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

function deleteUserOfId(peopleId) {
  return new Promise((resolve, reject) => {
    userIdQueryDelete = "DELETE FROM people WHERE peopleId = ?";
    DatabaseElement.query(userIdQueryDelete, [peopleId], (error, results) => {
      if (error) {
        console.error("Erreur suppression");
        reject(error);
      }
      resolve(results);
    });
  });
}

function deleteApplicationOfId(applicationId) {
  return new Promise((resolve, reject) => {
    applicationIdQueryDelete = "DELETE FROM applications WHERE applicationId = ?";
    DatabaseElement.query(applicationIdQueryDelete, applicationId, (error, results) => {
      if (error) {
        console.error("Erreur suppression");
        reject(error);
      }
      resolve(results);
    });
  });
}

function deleteAdvertisementsOfId(advertisementId) {
  return new Promise((resolve, reject) => {
    advertisementIdQueryDelete =
      "DELETE FROM advertisements WHERE advertisementsId = ?";
    DatabaseElement.query(
      advertisementIdQueryDelete,
      [advertisementId],
      (error, results) => {
        if (error) {
          console.error("Erreur suppression");
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

function deleteCompanyOfId(companyId) {
  return new Promise((resolve, reject) => {
    companyIdQueryDelete = "DELETE FROM company WHERE companyId = ?";
    DatabaseElement.query(companyIdQueryDelete, companyId, (error, results) => {
      if (error) {
        console.error("Erreur suppression");
        reject(error);
      }
      resolve(results);
    });
  });
}

function peopleInformation(mailPeople) {
  return new Promise((resolve, reject) => {
    const idUserQuery =
      "SELECT people.peopleId, people.firstNamePeople, people.namePeople, people.mailPeople, people.phoneNumberPeople, logType.logTypeLvl FROM people JOIN logType WHERE `mailPeople` = ?";
    DatabaseElement.query(idUserQuery, mailPeople, (error, results) => {
      if (error) {
        console.error("Erreur sur la récupération des infos par mail");
        reject(error);
      }
      resolve(results);
    });
  });
}

function checkPassword(mailPeople, passwordPeople) {
  return new Promise((resolve, reject) => {
    const passwordQuery =
      "SELECT `passwordPeople` FROM `people` WHERE `mailPeople` = ?";
    DatabaseElement.query(passwordQuery, mailPeople, (error, results) => {
      if (error) {
        console.error("Erreur de vérification mdp");
        reject(error);
      }
      resolve(results[0].passwordPeople == passwordPeople);
    });
  });
}

function checkPeople(peopleId) {
  return new Promise((resolve, reject) => {
    const peopleQuery = "SELECT * FROM `people` WHERE `peopleId` = ?";
    DatabaseElement.query(peopleQuery, peopleId, (error, results) => {
      if (error) {
        console.error("Erreur de vérification du user");
        return reject(error);
      }
      if (results.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function checkAdvertisement(advertisementId) {
  return new Promise((resolve, reject) => {
    const advertisementsQuery =
      "SELECT * FROM advertisements WHERE advertisementsId = ?";
    DatabaseElement.query(
      advertisementsQuery,
      advertisementId,
      (error, results) => {
        if (error) {
          console.error("Erreur de vérification du user");
          return reject(error);
        }
        if (results.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
}

function checkCompany(companyId) {
  return new Promise((resolve, reject) => {
    const companyQuery = "SELECT * FROM `company` WHERE `companyId` = ?";
    DatabaseElement.query(companyQuery, companyId, (error, results) => {
      if (error) {
        console.error("Erreur de vérification du user");
        return reject(error);
      }
      if (results.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function checkApplication(appicationId) {
  return new Promise((resolve, reject) => {
    const appicationQuery = "SELECT * FROM applications WHERE `applicationId` = ?";
    DatabaseElement.query(appicationQuery, appicationId, (error, results) => {
      if (error) {
        console.error("Erreur de vérification de l'application");
        return reject(error);
      }
      if (results.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function checkMail(mailPeople) {
  return new Promise((resolve, reject) => {
    const mailQuery =
      "SELECT `mailPeople` FROM `people` WHERE `mailPeople` = ?";
    DatabaseElement.query(mailQuery, mailPeople, (error, results) => {
      if (error) {
        console.error("Erreur vérif mail");
        return reject(error);
      }
      if (results.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function checkMailCompany(mailCompany) {
  return new Promise((resolve, reject) => {
    const mailQuery =
      "SELECT `mailCompany` FROM `company` WHERE `mailCompany` = ?";
    DatabaseElement.query(mailQuery, mailCompany, (error, results) => {
      if (error) {
        console.error("Erreur vérif mail");
        return reject(error);
      }
      if (results.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function checkMailApplication(mailApply) {
  return new Promise((resolve, reject) => {
    const mailQuery =
      "SELECT mailApply FROM applications WHERE `mailApply` = ?";
    DatabaseElement.query(mailQuery, mailApply, (error, results) => {
      if (error) {
        console.error("Erreur vérif mail");
        return reject(error);
      }
      if (results.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function insertLogType(logTypeLvl) {
  return new Promise((resolve, reject) => {
    const logTypeQuery = "INSERT INTO `logType` (`logTypeLvl`) VALUES (?)";
    DatabaseElement.query(logTypeQuery, [logTypeLvl], (error, results) => {
      if (error) {
        console.error("Erreur log type insertion");
        reject(error);
      }
      resolve(JSON.parse(JSON.stringify(results)));
    });
  });
}

function insertAddress(city, postalCode) {
  return new Promise((resolve, reject) => {
    const addressQuery =
      "INSERT INTO `addressOf` (`city`, `postalCode`) VALUES (?, ?)";
    DatabaseElement.query(
      addressQuery,
      [city, postalCode],
      (error, results) => {
        if (error) {
          console.error("Erreur durant l'insertion de l'adresse");
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

function insertContract(contractType, isRemote) {
  return new Promise((resolve, reject) => {
    const contractQuery =
      "INSERT INTO `contractOf` (`contractType`, `isRemote`) VALUES (?, ?)";
    DatabaseElement.query(
      contractQuery,
      [contractType, isRemote],
      (error, results) => {
        if (error) {
          console.error("Erreur durant l'insertion du type de contrat");
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

function insertCompany(
  nameCompany,
  mailCompany,
  phoneNumberCompany,
  descriptionCompany
) {
  return new Promise((resolve, reject) => {
    const addressQuery =
      "INSERT INTO `company` (`nameCompany`, `mailCompany`,`phoneNumberCompany`,`descriptionCompany`) VALUES (?, ? , ?, ?)";
    DatabaseElement.query(
      addressQuery,
      [nameCompany, mailCompany, phoneNumberCompany, descriptionCompany],
      (error, results) => {
        if (error) {
          console.error("Erreur durant l'insertion de la company");
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

function insertApplication(firstNameApply, nameApply, mailApply, messageApply) {
  return new Promise((resolve, reject) => {
    const addressQuery =
      "INSERT INTO `applications` (firstNameApply, nameApply, mailApply, messageApply) VALUES (?, ? , ?, ?)";
    DatabaseElement.query(
      addressQuery,
      [firstNameApply, nameApply, mailApply, messageApply],
      (error, results) => {
        if (error) {
          console.error("Erreur durant l'insertion de l'application");
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

function insertAdvertisement(
  nameAdvertisement,
  mailAdvertisement,
  descriptionAdvertisement,
  dateAdvertisement,
  addressId,
  contractAdvertisementsId
) {
  return new Promise((resolve, reject) => {
    const advertisementQuery =
      "INSERT INTO `advertisements` (`nameAdvertisement`, `mailAdvertisement`, `descriptionAdvertisement`, `dateAdvertisement`, `addressAdvertisementId`, `contractAdvertisementId`) VALUES (?, ?, ?, ?, ?, ?)";
    DatabaseElement.query(
      advertisementQuery,
      [
        nameAdvertisement,
        mailAdvertisement,
        descriptionAdvertisement,
        dateAdvertisement,
        addressId,
        contractAdvertisementsId,
      ],
      (error, results) => {
        if (error) {
          console.error("Erreur ajout advertisement");
          return reject(error);
        }
        resolve(results);
      }
    );
  });
}

function insertPeople(
  firstNamePeople,
  namePeople,
  mailPeople,
  passwordPeople,
  phoneNumberPeople,
  addressPeopleId,
  logTypePeopleId
) {
  return new Promise((resolve, reject) => {
    const peopleQuery =
      "INSERT INTO `people` (`firstNamePeople`, `namePeople`, `mailPeople`, `passwordPeople`, `phoneNumberPeople`, `addressPeopleId`, `logTypePeopleId`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    DatabaseElement.query(
      peopleQuery,
      [
        firstNamePeople,
        namePeople,
        mailPeople,
        passwordPeople,
        phoneNumberPeople,
        addressPeopleId,
        logTypePeopleId,
      ],
      (error, results) => {
        if (error) {
          console.error("Erreur ajout user");
          return reject(error);
        }
        resolve(results);
      }
    );
  });
}

function updateCompanyFromId(companyId, valueNameList, valueList) {
  return new Promise((resolve, reject) => {
    const queryUpdate = `UPDATE company SET ${valueNameList.join(
      ", "
    )} WHERE companyId = ?`;
    valueList.push(companyId);
    DatabaseElement.query(queryUpdate, valueList, (error, results) => {
      if (error) {
        console.error("erreur update people");
        reject(error);
      }
      resolve(results);
    });
  });
}

function updateApplicationyFromId(appicationId, valueNameList, valueList) {
  return new Promise((resolve, reject) => {
    const queryUpdate = `UPDATE applications SET ${valueNameList.join(
      ", "
    )} WHERE applicationId = ?`;
    valueList.push(appicationId);
    DatabaseElement.query(queryUpdate, valueList, (error, results) => {
      if (error) {
        console.error("erreur update people");
        reject(error);
      }
      resolve(results);
    });
  });
}

function updateAdvertisementFromId(advertisementId, valueNameList, valueList) {
  return new Promise((resolve, reject) => {
    const queryUpdate = `UPDATE advertisements SET ${valueNameList.join(
      ", "
    )} WHERE advertisementsId = ?`;
    valueList.push(advertisementId);
    console.log(valueList);
    console.log(valueNameList);
    DatabaseElement.query(queryUpdate, valueList, (error, results) => {
      if (error) {
        console.error("erreur update advertisement");
        reject(error);
      }
      resolve(results);
    });
  });
}

function updateFromId(peopleId, valueNameList, valueList) {
  return new Promise((resolve, reject) => {
    const queryUpdate = `UPDATE people SET ${valueNameList.join(
      ", "
    )} WHERE peopleId = ?`;
    valueList.push(peopleId);
    DatabaseElement.query(queryUpdate, valueList, (error, results) => {
      if (error) {
        console.error("erreur update people");
        reject(error);
      }
      resolve(results);
    });
  });
}

module.exports = {
  insertLogType,
  insertAddress,
  insertPeople,
  checkMail,
  checkPassword,
  peopleInformation,
  getAllUsers,
  getUserFromId,
  deleteUserOfId,
  updateFromId,
  checkPeople,
  checkMailCompany,
  insertCompany,
  deleteCompanyOfId,
  getCompanyFromId,
  checkCompany,
  updateCompanyFromId,
  getAllCompanies,
  insertAdvertisement,
  insertContract,
  getAllAdvertisements,
  getAdvertisementFromId,
  deleteAdvertisementsOfId,
  updateAdvertisementFromId,
  checkAdvertisement,
  checkMailApplication,
  insertApplication,
  deleteApplicationOfId,
  checkApplication,
  updateApplicationyFromId,
  getAllApplications,
  getApplicationFromId,
  getAddressFromId,
  getLogtypeFromId,
  getContractFromId
};
