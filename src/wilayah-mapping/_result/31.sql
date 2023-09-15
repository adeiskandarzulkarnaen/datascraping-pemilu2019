/*
MySQL - 8.0.33 : Update table wilayah
Run this SQL manual to fix missing data in column wilayah
*********************************************************************
*/

UPDATE wilayah SET kode = '31.01.02' WHERE kode_wilayah_kpu = '25823.25824.25829';
UPDATE wilayah_mendagri SET nama = 'KEPULAUAN SERIBU SELATAN' WHERE kode = '31.01.02';