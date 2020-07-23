s %=$$SFGetIDDAT^elibHULIB100("EPT",.ptID,.ptDAT) 
s patientname=$$FormatPatRealName^RXAMBLBLFORMAT(ptID,"5","0") 
s %=$$SFPutCV^elibHULIB100("ENL#3174","ENCOUNTER",patientname)

s %=$$SFGetIDDAT^elibHULIB100("EPT",.ptID,.ptDAT) 
s dob=$$Main^SNETLINK(ptID,ptDAT,"EPT110","","MM/dd/yyyy") 
s %=$$SFPutCV^elibHULIB100("ENL#3176","ENCOUNTER",dob)

s %=$$SFGetIDDAT^elibHULIB100("EPT",.ptID,.ptDAT) 
s patientage=$$age^HGDILPP(ptID,ptDAT,2) 
s %=$$SFPutCV^elibHULIB100("ENL#3177","ENCOUNTER",patientage)

s %=$$SFGetIDDAT^elibHULIB100("EPT",.ptID,.ptDAT) 
s mrn=$$OtherMRN^HUPATHDPAF3(ptID,"14") 
s %=$$SFPutCV^elibHULIB100("ENL#3175","ENCOUNTER",mrn