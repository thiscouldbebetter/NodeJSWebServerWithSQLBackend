drop database if exists WebSite;
create database WebSite;
use WebSite;

/* Tables */

create table User (UserID int not null auto_increment, Username text not null, EmailAddress text not null, PasswordSalt text not null, PasswordHashed text not null, PasswordResetCode text, IsActive boolean not null, primary key (UserID) );

create table Session(SessionID int not null auto_increment, UserID int, DeviceAddress text not null, TimeStarted datetime not null, TimeUpdated datetime not null, TimeEnded datetime, primary key (SessionID), foreign key (UserID) references User(UserID) );

/* Users */

grant select on *.* to 'web'@'localhost';
grant insert, update on License to 'web'@'localhost';
grant insert, update on Notification to 'web'@'localhost';
grant insert, update on _Order to 'web'@'localhost';
grant insert, update on Order_Product to 'web'@'localhost';
grant insert, update on Session to 'web'@'localhost';
grant insert, update on User to 'web'@'localhost';

flush privileges;
