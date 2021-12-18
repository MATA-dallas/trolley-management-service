import {
    Knex
} from "knex";


export async function up(knex: Knex): Promise < void > {
    await knex.raw(`
    CREATE TABLE IF NOT EXISTS \`allowedNumbers\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`name\` varchar(45) DEFAULT NULL,
        \`number\` varchar(16) DEFAULT NULL,
        PRIMARY KEY (\`ID\`)
        );
    `);
    await knex.raw(`
    CREATE TABLE IF NOT EXISTS \`cars\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`car\` int(11) NOT NULL,
        \`IMEI\` varchar(128) NOT NULL,
        PRIMARY KEY (\`ID\`)
        );
    `);

    await knex.raw(`CREATE TABLE IF NOT EXISTS \`highlights\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`Latitude\` float NOT NULL,
        \`Longitude\` float NOT NULL,
        \`name\` varchar(64) NOT NULL,
        \`iconURL\` varchar(256) NOT NULL,
        \`mobileBanner\` varchar(255) NOT NULL,
        \`webBanner\` varchar(255) NOT NULL,
        \`link\` varchar(255) NOT NULL,
        \`iconData\` text NOT NULL,
        \`description\` text NOT NULL,
        \`expiration\` datetime NOT NULL,
        PRIMARY KEY (\`ID\`)
        );`);

    await knex.raw(`CREATE TABLE IF NOT EXISTS \`inboundTrips\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`Car\` int(11) NOT NULL,
        \`startTime\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`endTime\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
        PRIMARY KEY (\`ID\`)
        );`);

    await knex.raw(`CREATE TABLE IF NOT EXISTS \`mapTimes\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`loadTime\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`length\` int(11) DEFAULT NULL,
        \`notes\` varchar(45) DEFAULT NULL,
        PRIMARY KEY (\`ID\`)
        );`);

    await knex.raw(`CREATE TABLE IF NOT EXISTS \`outboundTrips\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`Car\` int(11) NOT NULL,
        \`startTime\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`endTime\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
        PRIMARY KEY (\`ID\`)
        );`);

    await knex.raw(`CREATE TABLE IF NOT EXISTS \`positions\` (
        \`car\` int(11) NOT NULL,
        \`latitude\` float NOT NULL,
        \`longitude\` float NOT NULL,
        \`namedPoint\` varchar(64) NOT NULL,
        \`updateTime\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`manualStatus\` varchar(16) NOT NULL,
        PRIMARY KEY (\`car\`)
        );`);

    await knex.raw(`CREATE TABLE IF NOT EXISTS \`riderAlerts\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`UpdateID\` int(11) NOT NULL,
        \`Type\` varchar(8) NOT NULL,
        \`Alert\` text NOT NULL,
        \`Posted\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`Expiration\` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
        \`PostedBy\` varchar(64) NOT NULL,
        \`Active\` tinyint(1) NOT NULL DEFAULT '1',
        PRIMARY KEY (\`ID\`)
        );`);

    await knex.raw(`CREATE TABLE IF NOT EXISTS \`schedule\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`Day\` varchar(16) NOT NULL,
        \`startTime\` time NOT NULL,
        \`duration\` int(11) NOT NULL,
        PRIMARY KEY (\`ID\`)
        );`);

    await knex.raw(`CREATE TABLE IF NOT EXISTS \`stops\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`Name\` varchar(64) NOT NULL,
        \`Longitude\` float NOT NULL,
        \`Latitude\` float NOT NULL,
        PRIMARY KEY (\`ID\`)
        );`);

    await knex.raw(`CREATE TABLE IF NOT EXISTS \`texts\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`TwilioSID\` varchar(34) NOT NULL,
        \`From\` varchar(16) NOT NULL,
        \`To\` varchar(16) NOT NULL,
        \`Body\` text NOT NULL,
        \`Media\` int(11) NOT NULL,
        PRIMARY KEY (\`ID\`)
        );`);


    await knex.raw(`CREATE TABLE IF NOT EXISTS \`timing\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`car\` int(11) DEFAULT NULL,
        \`point\` varchar(45) DEFAULT NULL,
        \`time\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
        \`departure\` timestamp NULL DEFAULT NULL,
        PRIMARY KEY (\`ID\`)
        );`);

    await knex.raw(`CREATE TABLE IF NOT EXISTS \`users\` (
        \`ID\` int(11) NOT NULL AUTO_INCREMENT,
        \`user\` varchar(32) NOT NULL,
        \`password\` varchar(64) NOT NULL,
        \`enabled\` tinyint(1) NOT NULL,
        \`admin\` tinyint(1) NOT NULL,
        \`SMS\` tinyint(1) DEFAULT NULL,
        PRIMARY KEY (\`ID\`)
        );`);
}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
        DROP TABLE \`allowedNumbers\` 
        DROP TABLE \`cars\` 
        DROP TABLE \`highlights\` 
        DROP TABLE \`inboundTrips\` 
        DROP TABLE \`mapTimes\` 
        DROP TABLE \`outboundTrips\` 
        DROP TABLE \`positions\` 
        DROP TABLE \`riderAlerts\` 
        DROP TABLE \`schedule\` 
        DROP TABLE \`stops\` 
        DROP TABLE \`texts\` 
        DROP TABLE \`timing\` 
        DROP TABLE \`users\` 
    `);
}