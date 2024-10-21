> # Mettre en place la bdd

Pour lancer le projet en local il faut clone le project : 

`git clone git@github.com:EpitechMscProPromo2027/T-WEB-501-TLS_11.git`

## Initialiser la bbd 👍 :

Creer une base de donne dans mysql WorkBench et nommer le shcema `jobBoard` 💯 :

> [!NOTE]
> Si on a pas sqlWorkbench le télécharger -> `https://dev.mysql.com/downloads/workbench/`


### Exemple de db connect 
<pre> host: "localhost",
  user: "root",
  password: "root",
  database: "jobBoard",
</pre>

------------
> # Insérer le code
### Dans le query du schema `jobBoard` et lancer le query pour mettre en place les tables et les associations
<pre>
CREATE TABLE IF NOT EXISTS `addressOf` (
    addressOfId INT PRIMARY KEY AUTO_INCREMENT,
    city VARCHAR(50) NOT NULL,
    postalCode VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS `imageOf` (
    imageOfId INT PRIMARY KEY AUTO_INCREMENT,
    img BLOB NOT NULL
);

CREATE TABLE IF NOT EXISTS `contractOf` (
    contractId INT PRIMARY KEY AUTO_INCREMENT,
    contractType INT NOT NULL,
    isRemote BOOLEAN DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS `logType` (
    logTypeId INT PRIMARY KEY AUTO_INCREMENT,
    logTypeLvl INT NOT NULL
);

CREATE TABLE IF NOT EXISTS `applications` (
    applicationId INT PRIMARY KEY AUTO_INCREMENT,
    firstNameApply VARCHAR(50) NOT NULL,
    nameApply VARCHAR(50) NOT NULL,
    mailApply VARCHAR(100) NOT NULL,
    messageApply VARCHAR(500) NOT NULL
);

CREATE TABLE IF NOT EXISTS `advertisements` (
    advertisementId INT PRIMARY KEY AUTO_INCREMENT,
    nameAdvertisement VARCHAR(255) NOT NULL,
    mailAdvertisement VARCHAR(100) NOT NULL,
    descriptionAdvertisement VARCHAR(500),
    dateAdvertisement DATE,
    imageAdvertisementId INT,
    addressAdvertisementId INT,
    contractAdvertisementId INT,
    applicationAdvertisementId INT,
    FOREIGN KEY (imageAdvertisementId) REFERENCES `imageOf`(imageOfId),
    FOREIGN KEY (addressAdvertisementId) REFERENCES `addressOf`(addressOfId),
    FOREIGN KEY (contractAdvertisementId) REFERENCES `contractOf`(contractId),
    FOREIGN KEY (applicationAdvertisementId) REFERENCES `applications`(applicationId)
);

CREATE TABLE IF NOT EXISTS `company` (
    companyId INT PRIMARY KEY AUTO_INCREMENT,
    nameCompany VARCHAR(50) NOT NULL,
    mailCompany VARCHAR(100) NOT NULL,
    phoneNumberCompany VARCHAR(15) NOT NULL,
    descriptionCompany VARCHAR(500),
    imageCompanyId INT,
    FOREIGN KEY (imageCompanyId) REFERENCES `imageOf`(imageOfId)
);

CREATE TABLE IF NOT EXISTS `people` (
    peopleId INT PRIMARY KEY AUTO_INCREMENT,
    firstNamePeople VARCHAR(50) NOT NULL,
    namePeople VARCHAR(50) NOT NULL,
    mailPeople VARCHAR(100) NOT NULL,
    passwordPeople CHAR(60) NOT NULL,
    phoneNumberPeople VARCHAR(15),
    addressPeopleId INT,
    logTypePeopleId INT,
    applicationPeopleId INT,
    companyPeopleId INT,
    FOREIGN KEY (addressPeopleId) REFERENCES `addressOf`(addressOfId),
    FOREIGN KEY (logTypePeopleId) REFERENCES `logType`(logTypeId),
    FOREIGN KEY (applicationPeopleId) REFERENCES `applications`(applicationId),
    FOREIGN KEY (companyPeopleId) REFERENCES `company`(companyId)
);

</pre>

----------

> # Mise en place des modules et dépendances 👍

> [!CAUTION]
> Ne pas oublier pas de lancer le serveur sql Mac : `brew services start mysql` , sur Linux : `sudo systemctl start mysqld ` -> `mysql -u root -p jobBoard` < `path/jobBoard.sql`

Dans le front end -> `cd front` ensuite  `npm install --save` et pour finir `npm start`<br/>
Dans le back end -> `cd back` ensuite  `npm install --save` et pour finir `npm start` <br/>

