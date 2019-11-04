/**
 * @File Name          : WhatsAppResponseWrapper.cls
 * @Description        : 
 * @Author             : ABS
 * @Group              : 
 * @Last Modified By   : ABS
 * @Last Modified On   : 11/4/2019, 10:11:28 PM
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    11/4/2019   ABS     Initial Version
**/
public with sharing class WhatsAppResponseWrapper {
    public class Subresource_uris {
		public String media {get;set;} 
	}
	
	public String sid {get;set;} 
	public String date_created {get;set;} 
	public String date_updated {get;set;} 
	public String date_sent {get;set;} 
	public String account_sid {get;set;} 
	public String to {get;set;} 
	public String fromN {get;set;} 
	public String messaging_service_sid {get;set;} 
	public String body {get;set;} 
	public String status {get;set;} 
	public String num_segments {get;set;} 
	public String num_media {get;set;} 
	public String direction {get;set;} 
	public String api_version {get;set;} 
	public Integer price {get;set;} 
	public String price_unit {get;set;} 
	public String error_code {get;set;} 
	public String error_message {get;set;} 
	public String uri {get;set;} 
	public Subresource_uris subresource_uris {get;set;} 

}
