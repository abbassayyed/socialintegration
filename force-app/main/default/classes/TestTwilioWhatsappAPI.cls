/**
 * @File Name          : TestTwilioWhatsappAPI.cls
 * @Description        : 
 * @Author             : ABS
 * @Group              : 
 * @Last Modified By   : ABS
 * @Last Modified On   : 11/5/2019, 1:37:51 AM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    11/4/2019   ABS     Initial Version
**/
public with sharing class TestTwilioWhatsappAPI {
    @AuraEnabled
    public static string callTwilioWhatsAppAPI(String message,String destNumber){
        String result = '';
        Whatsapp__mdt config = [SELECT MasterLabel,AccountSID__c,AuthToken__c,TwilioSandboxNumber__c 
                                FROM Whatsapp__mdt
                                WHERE MasterLabel = 'Config' LIMIT 1];
        
        if(config != null && config.AccountSID__c != null &&
           config.AuthToken__c != null && config.TwilioSandboxNumber__c != null){
                
                HttpRequest req = new HttpRequest();
                req.setEndpoint('callout:Whatsapp/'+config.AccountSID__c+'/Messages.json');
                req.setMethod('POST');
                String finalBody    = '';
                finalBody    +='From='+EncodingUtil.urlEncode('whatsapp:'+config.TwilioSandboxNumber__c,'UTF-8');
                finalBody    +='&Body='+EncodingUtil.urlEncode(message,'UTF-8');
                finalBody    +='&To='+EncodingUtil.urlEncode('whatsapp:'+destNumber,'UTF-8');
                //System.debug('Final Body-->'+finalBody);
                req.setBody(finalBody);
                Http h = new Http();
                HttpResponse response = h.send(req);
                System.debug('r-->'+response);
                System.debug('Message-->'+response.getBody());
                if(response.getStatusCode() == 201){
                    WhatsAppResponseWrapper wrp = (WhatsAppResponseWrapper)JSON.deserialize(response.getBody(), WhatsAppResponseWrapper.class);
                    result = wrp.status;
                }else{
                    result ='Callout Failed';
                }
                
        }else{
            result = 'Config Data Missing';
        }

  
        return result; 
    }
}
