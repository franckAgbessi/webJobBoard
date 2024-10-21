CREATE TABLE IF NOT EXISTS  `addressOf` (
    addressOfId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    city VARCHAR(50) NOT NULL,
    postalCode VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS  `imageOf` (
    imageOfId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    img BLOB NOT NULL
);

CREATE TABLE IF NOT EXISTS  `contractOf` (
    contractId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    contractType INT NOT NULL,
    isRemote BOOLEAN DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `logType` (
    logTypeId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    logTypeLvl INT NOT NULL
);

CREATE TABLE IF NOT EXISTS `applications` (
    applicationId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    firstNameApply VARCHAR(50) NOT NULL,
    nameApply VARCHAR(50) NOT NULL,
    mailApply VARCHAR(50) NOT NULL,
    messageApply VARCHAR(500) NOT NULL,
    advertisementsApplyId VARCHAR(50) NOT NULL,
    FOREIGN KEY (advertisementsApplyId) REFERENCES `advertisements`(advertisementsId)
);

CREATE TABLE IF NOT EXISTS `advertisements` (
    advertisementsId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nameAdvertisement VARCHAR(255) NOT NULL,
    mailAdvertisement VARCHAR(255) NOT NULL,
    descriptionAdvertisement VARCHAR(500) DEFAULT NULL,
    dateAdvertisement DATE DEFAULT NULL,
    imageAdvertisementId INT,
    addressAdvertisementId INT,
    contractAdvertisementId INT,
    advertisementsCompanyId INT,
    FOREIGN KEY (imageAdvertisementId) REFERENCES `imageOf`(imageOfId),
    FOREIGN KEY (addressAdvertisementId) REFERENCES `addressOf`(addressOfId),
    FOREIGN KEY (contractAdvertisementId) REFERENCES `contractOf`(contractId),
    FOREIGN KEY (advertisementsCompanyId) REFERENCES `company`(companyId)
);

CREATE TABLE IF NOT EXISTS `company` (
    companyId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nameCompany VARCHAR(50) NOT NULL,
    mailCompany VARCHAR(50) NOT NULL,
    phoneNumberCompany VARCHAR(15) NOT NULL,
    descriptionCompany VARCHAR(500) DEFAULT NULL,
    imageCompanyId INT,
    creatorId INT,
    FOREIGN KEY (imageCompanyId) REFERENCES `imageOf`(imageOfId),
    FOREIGN KEY (creatorId) REFERENCES `people`(peopleId)
);

CREATE TABLE IF NOT EXISTS `people` (
    peopleId INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    firstNamePeople VARCHAR(50) NOT NULL,
    namePeople VARCHAR(50) NOT NULL,
    mailPeople VARCHAR(50) NOT NULL,
    passwordPeople CHAR(60) NOT NULL,
    phoneNumberPeople VARCHAR(15) DEFAULT NULL,
    addressPeopleId INT,
    logTypePeopleId INT,
    applicationPeopleId INT DEFAULT NULL,
    companyPeopleId INT DEFAULT NULL,
    FOREIGN KEY (addressPeopleId) REFERENCES `addressOf`(addressOfId),
    FOREIGN KEY (logTypePeopleId) REFERENCES `logType`(logTypeId)
);