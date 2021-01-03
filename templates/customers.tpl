insert into names(ID,FIRST_NAME,LAST_NAME,COMPANY,
    LAST_TRANSACTION_DATE,BIRTH_DATE,IDENTIFICATION_TYPE,
    IDENTIFICATION, IS_ACTIVE, BALANCE)
 values ({{id}}, '{{firstName}}','{{lastName}}','{{company}}',
  '{{lastTransactionDate}}','{{birthDate}}', '{{identificationType}}',
  '{{identification}}', '{{isActive}}', '{{balance}}');
 