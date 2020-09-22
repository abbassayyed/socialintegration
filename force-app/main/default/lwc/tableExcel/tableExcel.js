import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import jTable from "@salesforce/resourceUrl/TableExcel";
import jTableCss from "@salesforce/resourceUrl/TableExcel2";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

export default class tableExcel extends LightningElement {
  tInitialized = false;

  renderedCallback() {
    if (this.tInitialized) {
      return;
    }
    this.tInitialized = true;
    Promise.all([loadScript(this, jTable + "/src/jexcel.js")])
      .then(() => {
        let data = [
          ["Jazz", "Honda", "2019-02-12", "", true, "$ 2.00000", "#777700"],
          ["Civic", "Honda", "2018-07-11", "", true, "$ 4.00001", "#007777"]
        ];
        console.log("LWC-->DATA-->" + JSON.stringify(data));
        this.jexcel(this.template.querySelector("div"), {
          data: data,
          columns: [
            { type: "text", title: "Car", width: 120 },
            {
              type: "dropdown",
              title: "Make",
              width: 200,
              source: ["Alfa Romeo", "Audi", "Bmw"]
            },
            { type: "calendar", title: "Available", width: 200 },
            { type: "image", title: "Photo", width: 120 },
            { type: "checkbox", title: "Stock", width: 80 },
            {
              type: "numeric",
              title: "Price",
              width: 100,
              mask: "$ #.##,00",
              decimal: ","
            },
            { type: "color", width: 100, render: "square" }
          ]
        });
      })
      .catch(error => {
        console.log("LWC-->PROMISE ERROR-->" + JSON.stringify(error));
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error loading JEXCEL",
            message: JSON.stringify(error),
            variant: "error"
          })
        );
      });
  }
}
