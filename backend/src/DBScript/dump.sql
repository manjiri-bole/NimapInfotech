CREATE SCHEMA medrevo_db;
use medrevo_db;

--------UserTable----------
CREATE TABLE `tblUsers` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `MobileNo` varchar(10) NOT NULL,
  `MobileNoAlt` varchar(10) DEFAULT NULL,
  `EmailId` varchar(255) NOT NULL,
  `AddressLine1` varchar(255) DEFAULT NULL,
  `AddressLine2` varchar(255) DEFAULT NULL,
  `Place` varchar(100) DEFAULT NULL,
  `Tahsil` varchar(100) DEFAULT NULL,
  `Dist` varchar(100) DEFAULT NULL,
  `State` varchar(100) DEFAULT NULL,
  `Country` varchar(100) DEFAULT 'INDIA',
  `Pincode` varchar(10) DEFAULT NULL,
  `Landmark` varchar(100) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `IsActive` tinyint(4) DEFAULT '1',
  `IsDeleted` tinyint(4) DEFAULT '0',
  `LastLoginOn` datetime DEFAULT NULL,
  `ProfilePicture` varchar(255) DEFAULT NULL,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `UpdatedOn` varchar(50) DEFAULT NULL,
  `CreatedById` int(11) DEFAULT NULL,
  `UpdatedById` int(11) DEFAULT NULL,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;





ALTER TABLE `tblUsers` ADD COLUMN `AddressLine1` varchar(255) DEFAULT NULL, ADD COLUMN   `AddressLine2` varchar(255) DEFAULT NULL, ADD COLUMN   `Place` varchar(100) DEFAULT NULL, ADD COLUMN   `Tahsil` varchar(100) DEFAULT NULL, ADD COLUMN   `Dist` varchar(100) DEFAULT NULL, ADD COLUMN   `State` varchar(100) DEFAULT NULL, ADD COLUMN   `Country` varchar(100) DEFAULT 'INDIA', ADD COLUMN   `Pincode` varchar(10) DEFAULT NULL, ADD COLUMN   `Landmark` varchar(100) DEFAULT NULL;
ALTER TABLE `tblUsers` ADD COLUMN   `IsDeleted` tinyint(4) DEFAULT '0';
ALTER TABLE tblUsers ADD COLUMN `CreatedById` int(11) default null;
ALTER TABLE tblUsers ADD COLUMN `UpdatedById` int(11) default null;

-------------CustomerTable--------------
CREATE TABLE `tblCustomers` (
  `CustomerId` int(11) NOT NULL AUTO_INCREMENT,
  `BusinessId` int(11) DEFAULT NULL,
  `BusinessName` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `MobileNo` varchar(255) NOT NULL,
  `MobileNoAlt` varchar(255) DEFAULT NULL,
  `EmailId` varchar(255) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT '0',
  `IsVerified` tinyint(1) DEFAULT '0',
  `IsDeleted` tinyint(1) DEFAULT '0',
  `VerifiedOn` varchar(50) DEFAULT NULL,
  `LastLoginOn` datetime DEFAULT NULL,
  `ProfilePicture` text,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `UpdatedOn` varchar(50) DEFAULT NULL,
  `UpdatedByUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`CustomerId`),
  KEY `FK_UpdatedByUserIdCustomer` (`UpdatedByUserId`),
  CONSTRAINT `FK_UpdatedByUserIdCustomer` FOREIGN KEY (`UpdatedByUserId`) REFERENCES `tblUsers` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=263 DEFAULT CHARSET=latin1;




ALTER TABLE `tblCustomers` ADD COLUMN `BusinessId` int(11) default NULL AFTER CustomerId;
ALTER TABLE `tblCustomers` ADD COLUMN `BusinessName` varchar(255) default NULL AFTER BusinessId;
Alter table tblCustomers ADD COLUMN  `UpdatedByUserId` int(11) default null;
ALTER TABLE tblCustomers ADD CONSTRAINT FK_UpdatedByUserIdCustomer FOREIGN KEY (UpdatedByUserId) REFERENCES tblUsers(UserId);


------------ProductTable----------------
CREATE TABLE `tblProducts` (
  `ProdId` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryId` int(11) DEFAULT NULL,
  `CompanyId` smallint(5) unsigned DEFAULT NULL,
  `ProdTitle` varchar(255) NOT NULL,
  `PackType` varchar(255) DEFAULT 'Other',
  `ProdSize` varchar(255) DEFAULT NULL,
  `HsnCode` int(11) DEFAULT NULL,
  `Molecule` varchar(255) DEFAULT NULL,
  `MoleculeTitle` text,
  `Gst` tinyint(4) DEFAULT '0',
  `IsActive` tinyint(4) DEFAULT '1',
  `CreatedByUserId` int(11) DEFAULT NULL,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `UpdatedByUserId` int(11) DEFAULT NULL,
  `UpdatedOn` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ProdId`),
  KEY `CategoryId` (`CategoryId`),
  KEY `UpdatedByUserId` (`UpdatedByUserId`),
  KEY `CompanyId` (`CompanyId`),
  CONSTRAINT `FK_CategoryProducts` FOREIGN KEY (`CategoryId`) REFERENCES `tblCategory` (`CategoryId`),
  CONSTRAINT `FK_CompanyProducts` FOREIGN KEY (`CompanyId`) REFERENCES `tblCompany` (`CompanyId`)
) ENGINE=InnoDB AUTO_INCREMENT=24649 DEFAULT CHARSET=latin1;




ALTER TABLE tblProducts ADD COLUMN `MoleculeTitle` varchar(255) AFTER Molecule;


-----------------CategoryTable------------
CREATE TABLE `tblCategory` (
  `CategoryId` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(255) NOT NULL,
  `Margin` double(7,2) unsigned DEFAULT '0.00',
  `CategoryTitle` varchar(255) NOT NULL,
  `CategorySubTitle` varchar(255) NOT NULL,
  `CategoryDesc` varchar(255) NOT NULL,
  `CategoryDeepLink` varchar(255) NOT NULL,
  `SearchCount` int(11) DEFAULT '0',
  `IsActive` tinyint(1) DEFAULT '1',
  `CreatedByUserId` int(11) DEFAULT NULL,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `UpdatedByUserId` int(11) DEFAULT NULL,
  `UpdatedOn` varchar(50) DEFAULT NULL,
  `CategoryImageNode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CategoryId`),
  KEY `CreatedByUserId` (`CreatedByUserId`),
  KEY `UpdatedByUserId` (`UpdatedByUserId`),
  CONSTRAINT `FK_CreatedUserIdCategory` FOREIGN KEY (`CreatedByUserId`) REFERENCES `tblUsers` (`UserId`),
  CONSTRAINT `FK_UpdatedUserIdCategory` FOREIGN KEY (`UpdatedByUserId`) REFERENCES `tblUsers` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;

ALTER TABLE tblCategory ADD COLUMN `CategoryImageNode` varchar(255);


-------------Privilegestable----------------
CREATE TABLE `tblPrivileges` (
  `PrivId` int(11) NOT NULL,
  `PrivTitle` varchar(255) NOT NULL,
  `PrivDesc` varchar(255) NOT NULL,
  PRIMARY KEY (`PrivId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


INSERT INTO tblPrivileges (PrivId,PrivTitle,PrivDesc) VALUES (6,'Manage Users','Manage Users');


----------BuisnessTable--------------
CREATE TABLE `tblBusiness` (
  `BusinessId` int(11) NOT NULL AUTO_INCREMENT,
  `BusinessName` varchar(255) NOT NULL,
  `CustomerId` int(11) NOT NULL,
  `CustomerType` tinyint(1) NOT NULL,
  `AddressLine1` varchar(255) DEFAULT NULL,
  `AddressLine2` varchar(255) DEFAULT NULL,
  `Place` varchar(100) DEFAULT NULL,
  `Tahsil` varchar(100) DEFAULT NULL,
  `Dist` varchar(100) DEFAULT NULL,
  `State` varchar(100) DEFAULT NULL,
  `Country` varchar(100) DEFAULT 'INDIA',
  `Pincode` int(6) DEFAULT NULL,
  `Landmark` varchar(100) DEFAULT NULL,
  `Licence20` varchar(255) DEFAULT NULL,
  `Licence21` varchar(255) DEFAULT NULL,
  `Gstn` varchar(15) DEFAULT NULL,
  `Pan` varchar(10) NOT NULL,
  `GstImage` varchar(255) DEFAULT NULL,
  `PanImage` varchar(255) DEFAULT NULL,
  `ValidFrom` varchar(50) DEFAULT NULL,
  `ValidTill` varchar(50) DEFAULT NULL,
  `Status` varchar(255) DEFAULT 'PENDING',
  `IsDeleted` tinyint(4) DEFAULT '0',
  `IsWarehouseCreated` tinyint(4) DEFAULT '0',
  `VerifiedByUserId` int(11) DEFAULT NULL,
  `VerifiedOn` varchar(50) DEFAULT NULL,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `UpdatedOn` varchar(50) DEFAULT NULL,
  `StatusInfo` varchar(255) DEFAULT NULL,
  `IsDeliveryAvailable` tinyint(4) DEFAULT '0',
  `WarehouseName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`BusinessId`),
  KEY `CustomerId` (`CustomerId`),
  KEY `VerifiedByUserId` (`VerifiedByUserId`),
  CONSTRAINT `FK_CustomerBusiness` FOREIGN KEY (`CustomerId`) REFERENCES `tblCustomers` (`CustomerId`),
  CONSTRAINT `FK_VerifiedByUserIdBusiness` FOREIGN KEY (`VerifiedByUserId`) REFERENCES `tblUsers` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;



ALTER TABLE tblBusiness ADD COLUMN `IsDeliveryAvailable` tinyint(4) default 0;
ALTER TABLE tblBusiness ADD COLUMN `IsWarehouseCreated` tinyint(4) default 0;
ALTER TABLE tblBusiness ADD COLUMN `WarehouseName` varchar(255); 

--------------UserPrivilegeTable-------------
CREATE TABLE `tblUserprivilege` (
  `UpId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `PrivId` int(11) NOT NULL,
  `CreatedOn` varchar(255) DEFAULT NULL,
  `UpdatedOn` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UpId`),
  KEY `UserId` (`UserId`),
  KEY `PrivId` (`PrivId`),
  CONSTRAINT `FK_PrivIdPrivileges` FOREIGN KEY (`PrivId`) REFERENCES `tblPrivileges` (`PrivId`),
  CONSTRAINT `FK_UserIdPrivileges` FOREIGN KEY (`UserId`) REFERENCES `tblUsers` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;




------------ProductImageTable---------
CREATE TABLE `tblProductImages` (
  `ImageId` int(11) NOT NULL AUTO_INCREMENT,
  `ProdId` int(11) NOT NULL,
  `ImageUrl` varchar(255) NOT NULL,
  `IsDefault` tinyint(4) DEFAULT '0',
  `IsVerified` tinyint(4) DEFAULT '0',
  `IsActive` tinyint(4) DEFAULT '0',
  `CreatedByUserId` int(11) DEFAULT NULL,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `UpdatedByUserId` int(11) DEFAULT NULL,
  `UpdatedOn` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ImageId`),
  KEY `ProdId` (`ProdId`),
  CONSTRAINT `FK_ProdIdImages` FOREIGN KEY (`ProdId`) REFERENCES `tblProducts` (`ProdId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;





-----------ComapnyTable--------------
CREATE TABLE `tblCompany` (
  `CompanyId` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(255) NOT NULL,
  `IsDeleted` tinyint(4) DEFAULT '0',
  `CreatedByUserId` int(11) DEFAULT NULL,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `UpdatedByUserId` int(11) DEFAULT NULL,
  `UpdatedOn` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CompanyId`),
  KEY `UpdatedByUserId` (`UpdatedByUserId`),
  CONSTRAINT `FK_UpdatedByUserIdCompany` FOREIGN KEY (`UpdatedByUserId`) REFERENCES `tblUsers` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=latin1;





------------DealsTable------------
CREATE TABLE `tblDeals` (
  `DealId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ParentDealId` int(11) DEFAULT NULL,
  `BusinessId` int(11) DEFAULT NULL,
  `ProdId` int(11) DEFAULT NULL,
  `CompanyId` int(11) unsigned DEFAULT NULL,
  `CompanyName` varchar(255) DEFAULT NULL,
  `ProdTitle` varchar(255) DEFAULT NULL,
  `StartOn` varchar(50) DEFAULT NULL,
  `EndOn` varchar(50) DEFAULT NULL,
  `ActualStock` int(11) NOT NULL,
  `AvailableStock` int(11) NOT NULL,
  `Mrp` double(7,2) unsigned NOT NULL,
  `Ptr` float NOT NULL,
  `Discount` double unsigned DEFAULT NULL,
  `Buy` smallint(5) unsigned DEFAULT NULL,
  `Get` smallint(5) unsigned DEFAULT NULL,
  `DealRate` float NOT NULL,
  `DealScheme` varchar(100) DEFAULT NULL,
  `Gst` tinyint(2) unsigned DEFAULT '0',
  `PackType` varchar(100) NOT NULL,
  `PackSize` varchar(100) NOT NULL,
  `ProdExpiryDate` varchar(50) DEFAULT NULL,
  `SearchCount` int(11) unsigned DEFAULT '0',
  `ClaimCount` int(11) unsigned DEFAULT '0',
  `IsFeatured` tinyint(1) DEFAULT '0',
  `MaxQtyPerRetailer` int(11) unsigned DEFAULT NULL,
  `MinQtyPerRetailer` int(11) unsigned DEFAULT NULL,
  `Status` varchar(255) DEFAULT 'PENDING',
  `ApprovedByUserId` int(11) DEFAULT NULL,
  `ApprovedOn` varchar(50) DEFAULT NULL,
  `CreatedByUserId` int(11) DEFAULT NULL,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `UpdatedByUserId` int(11) DEFAULT NULL,
  `Updatedon` varchar(50) DEFAULT NULL,
  `StatusInfo` varchar(255) DEFAULT NULL,
  `BannerImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DealId`),
  KEY `ProdId` (`ProdId`),
  KEY `ApprovedByUserId` (`ApprovedByUserId`),
  KEY `CreatedByUserId` (`CreatedByUserId`),
  CONSTRAINT `FK_ApprovedByUserIdDeal` FOREIGN KEY (`ApprovedByUserId`) REFERENCES `tblUsers` (`UserId`),
  CONSTRAINT `FK_CreatedByUserIdDeal` FOREIGN KEY (`CreatedByUserId`) REFERENCES `tblCustomers` (`CustomerId`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;




ALTER TABLE `tblDeals` Add column `BannerImage` varchar(255) DEFAULT NULL;
ALTER TABLE `tblDeals` ADD COLUMN `BusinessId` int(11) DEFAULT NULL AFTER ParentDealId;
ALTER TABLE `tblDeals` DROP COLUMN ImageMobile1;
ALTER TABLE `tblDeals` DROP COLUMN ImageWeb1;


----------WishList--------------
CREATE TABLE `tblWishlist` (
  `WishId` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerId` int(11) NOT NULL,
  `DealId` int(11) unsigned NOT NULL,
  `CreatedOn` datetime DEFAULT NULL,
  PRIMARY KEY (`WishId`),
  KEY `CustomerId` (`CustomerId`),
  KEY `DealId` (`DealId`),
  CONSTRAINT `FK_CustomerIdBrands` FOREIGN KEY (`CustomerId`) REFERENCES `tblCustomers` (`CustomerId`),
  CONSTRAINT `FK_DealIdBrands` FOREIGN KEY (`DealId`) REFERENCES `tblDeals` (`DealId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-----------CartTable------------
CREATE TABLE `tblCart` (
  `CartId` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `CustomerId` int(11) NOT NULL,
  `BusinessId` int(11) DEFAULT NULL,
  `DealId` int(11) unsigned NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CartId`),
  KEY `DealId` (`DealId`),
  KEY `CustomerId` (`CustomerId`),
  CONSTRAINT `FK_CustomerIdCart` FOREIGN KEY (`CustomerId`) REFERENCES `tblCustomers` (`CustomerId`),
  CONSTRAINT `FK_DealIdCart` FOREIGN KEY (`DealId`) REFERENCES `tblDeals` (`DealId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



ALTER TABLE tblCart ADD COLUMN `Quantity` int(11);
ALTER TABLE  tblCart ADD COLUMN `Type` varchar(255);
ALTER TABLE tblCart ADD COLUMN `BusinessId` int(11) AFTER CustomerId;


------------OrderTable---------------
CREATE TABLE `tblOrders` (
  `OrderId` int(11) NOT NULL AUTO_INCREMENT,
  `OrderMasterId` varchar(255) DEFAULT NULL,
  `OrderNumber` varchar(255) DEFAULT NULL,
  `WaybillNumber` varchar(255) DEFAULT NULL,
  `UploadWBN` varchar(100) DEFAULT NULL,
  `BusinessId` int(11) DEFAULT NULL,
  `DealId` int(11) unsigned NOT NULL,
  `PaymentType` tinyint(4) DEFAULT NULL,
  `OrderDate` varchar(50) DEFAULT NULL,
  `Price` double DEFAULT NULL,
  `GST` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Discount` float DEFAULT NULL,
  `Buy` int(11) DEFAULT NULL,
  `Get` int(11) DEFAULT NULL,
  `TotalAmount` double DEFAULT NULL,
  `EstimatedPrice` double DEFAULT NULL,
  `Size` varchar(255) DEFAULT NULL,
  `BillDate` datetime DEFAULT NULL,
  `Freight` double DEFAULT NULL,
  `Tax` double DEFAULT NULL,
  `ShipperId` varchar(255) DEFAULT NULL,
  `SellerId` int(11) DEFAULT NULL,
  `ShipDate` datetime DEFAULT NULL,
  `RequiredDate` datetime DEFAULT NULL,
  `OrderStatus` varchar(255) DEFAULT 'PENDING',
  `ShippingDetails` varchar(255) DEFAULT NULL,
  `TransactionStatus` varchar(255) DEFAULT 'PENDING',
  `TransactionReferenceNumber` varchar(255) DEFAULT NULL,
  `ErrorLocation` varchar(255) DEFAULT NULL,
  `ErrorMsg` varchar(255) DEFAULT NULL,
  `PaymentDate` datetime DEFAULT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  `UpdatedByUserId` int(11) DEFAULT NULL,
  `Remark` varchar(255) DEFAULT NULL,
  `DeliveryStatus` varchar(255) DEFAULT 'PENDING',
  PRIMARY KEY (`OrderId`),
  KEY `DealId` (`DealId`),
  KEY `BusinessId` (`BusinessId`),
  KEY `FK_UpdatedByUserIdOrder` (`UpdatedByUserId`),
  CONSTRAINT `FK_UpdatedByUserIdOrder` FOREIGN KEY (`UpdatedByUserId`) REFERENCES `tblUsers` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;



ALTER TABLE `tblOrders` DROP FOREIGN KEY `tblOrders_ibfk_1`;
ALTER TABLE `tblOrders` DROP COLUMN `CustomerId`;
ALTER TABLE `tblOrders` ADD FOREIGN KEY (`BusinessId` ) REFERENCES `tblBusiness` (`BusinessId`);
ALTER TABLE `tblOrders` ADD FOREIGN KEY (`PaymentId` ) REFERENCES `tblPayment` (`PaymentId`);

ALTER TABLE `tblOrders` DROP COLUMN AddressId;
ALTER TABLE `tblOrders` DROP COLUMN PaymentId;
ALTER TABLE `tblOrders`  ADD COLUMN `Buy` int(11) AFTER Discount;
ALTER TABLE `tblOrders`  ADD COLUMN `Get` int(11) AFTER Discount;
ALTER TABLE `tblOrders` ADD COLUMN `PaymentType` tinyint(4) after DealId;
ALTER TABLE `tblOrders` ADD COLUMN `CustomerId` int(11);
ALTER TABLE `tblOrders` ADD COLUMN `UpdatedByUserId` int(11) default null;
ALTER TABLE tblOrders ADD CONSTRAINT FK_UpdatedByUserIdOrder FOREIGN KEY (UpdatedByUserId) REFERENCES tblUsers(UserId);
ALTER TABLE `tblOrders` CHANGE COLUMN   DeliveryStatus TransactionStatus varchar(255) DEFAULT 'PENDING';
ALTER TABLE `tblOrders` DROP COLUMN DeliveryCharges;
ALTER TABLE `tblOrders` ADD column `OrderMasterId` varchar(255) AFTER OrderId;
ALTER TABLE tblOrders modify `ShipperId` varchar(255);
ALTER TABLE tblOrders ADD COLUMN `WaybillNumber`  varchar(255) After OrderNumber;
ALTER TABLE tblOrders Add column `UploadWBN` varchar(100) AFTER WaybillNumber;
ALTER TABLE tblOrders ADD COLUMN `OrderJson` text;
ALTER TABLE tblOrders ADD COLUMN `Remark` varchar(255);
ALTER TABLE tblOrders ADD COLUMN `EstimatedPrice` double After TotalAmount;
ALTER TABLE tblOrders ADD COLUMN `DeliveryStatus` varchar(255) DEFAULT 'PENDING';
ALTER TABLE `tblOrders` DROP COLUMN OrderJson;

------------shipperTable---------------
CREATE TABLE `tblShipper` (
  `ShipperId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(255) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`ShipperId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE tblShipper Drop column AddressId;
ALTER TABLE tblShipper ADD `Status` tinyint(4) default 1;


--------------PaymentTable-------------------------
CREATE TABLE `tblPayment` (
  `PaymentId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `PaymentType` int(11) DEFAULT NULL,
  `Allowed` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`PaymentId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

---------------SellerTable----------------
CREATE TABLE `tblSeller` (
  `SellerId` int(11) NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SellerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

------------Updated in prod db on 08-March-2020-----------------

CREATE TABLE `tblMolecules` (
  `MoleculeId` int(11) NOT NULL AUTO_INCREMENT,
  `MoleculeName` varchar(255) NOT NULL,
  PRIMARY KEY (`MoleculeId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


-----------update ShipperTable------------------
CREATE TABLE `tblShipper` (
  `ShipperId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `CompanyName` varchar(255) DEFAULT NULL,
  `Status` tinyint(4) DEFAULT '1',
  PRIMARY KEY (`ShipperId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

ALTER TABLE tblShipper MODIFY `Status` tinyint(4) default 1;

-------updated in db on 14-March-2020----------------


ALTER TABLE `tblOrders` ADD COLUMN `GST` int(11) DEFAULT 0;

Alter table tblOrders DROP FOREIGN KEY tblOrders_ibfk_4;

-------------Notificationtable--------------
CREATE TABLE `tblNotification` (
  `NotificationId` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerId` int(11) NOT NULL,
  `BusinessId` int(11) DEFAULT NULL,
  `DealId` int(11) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Message` varchar(255) DEFAULT NULL,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `ReadStatus` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`NotificationId`)
) ENGINE=InnoDB AUTO_INCREMENT=805 DEFAULT CHARSET=latin1;



Alter table tblNotification ADD COLUMN `DealId` int(11) AFTER CustomerId;
ALTER TABLE tblNotification ADD COLUMN `Title` varchar(255) After DealId;
ALTER TABLE tblNotification ADD COLUMN `ReadStatus` tinyint(4) default 0;
ALTER TABLE tblNotification ADD COLUMN `BusinessId` INT(11) AFTER CustomerId;

-----------tblOrderMaster-------------
CREATE TABLE `tblOrderMaster` (
  `OrderMasterId` varchar(255) NOT NULL,
  `OrderDate` varchar(50) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Amount` int(11) DEFAULT NULL,
  `Gst` int(11) DEFAULT NULL,
  `DeliveryCharges` int(11) DEFAULT NULL,
  `GrandTotal` int(11) DEFAULT NULL,
  `BusinessId` int(11) NOT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  `SellerCustomerId` int(11) DEFAULT NULL,
  `SellerBusinessId` int(11) DEFAULT NULL,
  `OrderStatus` varchar(50) DEFAULT 'PENDING',
  `DeliveryStatus` varchar(50) DEFAULT 'PENDING',
  `CreatedOn` varchar(50) DEFAULT NULL,
  `UpdatedOn` varchar(50) DEFAULT NULL,
  `OrderJson` text,
  `UpdatedByUserId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



ALTER TABLE `tblOrderMaster` Change `OrderId` `OrderMasterId` varchar(255);
ALTER TABLE `tblOrderMaster` ADD COLUMN `OrderStatus` varchar(50) default "PENDING" after CustomerId;
ALTER TABLE `tblOrderMaster` ADD COLUMN `DeliveryStatus` varchar(50) default "PENDING" after Orderstatus;
ALTER TABLE `tblOrderMaster` ADD COLUMN `OrderDate` varchar(50) after OrderMasterId;

ALTER TABLE `tblOrderMaster` ADD COLUMN `SellerCustomerId` int(11) AFTER CustomerId;
ALTER TABLE `tblOrderMaster` ADD COLUMN `SellerBusinessId` int(11) AFTER CustomerId;
ALTER TABLE `tblOrderMaster` ADD COLUMN `OrderJson` text;
ALTER TABLE `tblOrderMaster` ADD COLUMN `UpdatedByUserId` int(11);


--------------tblWayBill---------------

CREATE TABLE `tblWaybill` (
  `WayBillId` int(11) NOT NULL AUTO_INCREMENT,
  `OrderId` varchar(255) DEFAULT NULL,
  `WayBillNumber` varchar(255) NOT NULL,
  `Weight` varchar(45) DEFAULT NULL,
  `CreatedOn` varchar(50) DEFAULT NULL,
  `DeliveryStatus` varchar(50) DEFAULT 'PENDING',
  PRIMARY KEY (`WayBillId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




ALTER TABLE tblWaybill Add COLUMN `DeliveryStatus` varchar(50) DEFAULT  'PENDING';
ALTER TABLE tblWaybill Modify OrderId varchar(255);

------------------tblInvoice----------------------

CREATE TABLE `tblInvoice` (
  `InvoiceId` int(11) NOT NULL AUTO_INCREMENT,
  `OrderId` varchar(255) DEFAULT NULL,
  `BusinessId` int(11) NOT NULL,
  `InvoiceNumber` varchar(50) NOT NULL,
  `InvoiceAmount` double DEFAULT NULL,
  `InvoiceDate` varchar(50) NOT NULL,
  `IsReadyForPickup` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`InvoiceId`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;





ALTER TABLE tblInvoice Modify InvoiceNumber varchar(50);
ALTER TABLE tblInvoice ADD COLUMN `IsReadyForPickup` tinyint default 0;
ALTER TABLE tblInvoice Modify OrderId varchar(255);
ALTER TABLE tblInvoice ADD COLUMN `BusinessId` int(11) AFTER OrderId;
