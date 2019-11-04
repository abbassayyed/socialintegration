import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import callTwilioWhatsAppAPI from "@salesforce/apex/TestTwilioWhatsappAPI.callTwilioWhatsAppAPI";

export default class whatsApp extends LightningElement {
  //console.log("ShowEvnt-->"+ new ShowToastEvent());
  @track text = "";
  @track phone = "";
  @track showSpinner = false;

  textChangeHandler(event) {
    this.text = event.target.value;
  }
  phoneChangeHandler(event) {
    this.phone = event.target.value;
  }

  sendButtonHandler() {
    this.showSpinner = true;
    console.log("Text-->" + JSON.stringify(this.text));
    console.log("Phone-->" + JSON.stringify(this.phone));
    if (this.phone !== undefined && this.text !== undefined) {
      callTwilioWhatsAppAPI({ message: this.text, destNumber: this.phone })
        .then(response => {
          this.showSpinner = false;
          console.log("APEX RESP-->" + JSON.stringify(response));
          if (response === "queued") {
            this.dispatchEvent(
              new ShowToastEvent({
                title: "Success!!",
                message: "message sent successfully...",
                variant: "success"
              })
            );

            //startConfetti();
            //console.log("after confetti......");
            //confetti.toggleConfetti();
          } else {
            this.dispatchEvent(
              new ShowToastEvent({
                title: "Oops!!",
                message: "something wrong with apex..",
                variant: "error"
              })
            );
          }
        })
        .catch(error => {
          this.showSpinner = false;
          this.dispatchEvent(
            new ShowToastEvent({
              title: "Oops!! Something went wrong...",
              message: `message sending failed: ${error}`,
              variant: "error"
            })
          );
        });
    } else {
      this.showSpinner = false;
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Aah!!!",
          message: `please enter correct output`,
          variant: "warning"
        })
      );
    }
  }
}
