import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export default async function modifyPdf(req,res) {
    if (req.method === 'POST'){
        const { bill_no, partyName, date, amount_words,amount, cgst, sgst, bill } = JSON.parse(req.body);
        const url =  path.resolve(process.cwd(), 'renderer', 'public', 'SampleBillEmpty.pdf');
        const existingPdfBytes = fs.readFileSync(url);
      
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()
        firstPage.drawText(String(bill_no), {
            x: width - 60,
            y: height - 189 ,
            size: 10,
            font: helveticaFont,
          })
        firstPage.drawText(String(partyName), {
          x: 45,
          y: height - 200 ,
          size: 15,
          font: helveticaFont,
        })
        firstPage.drawText(String(date), {
            x: width - 130,
            y: height - 250 ,
            size: 13,
            font: helveticaFont,
        })
        firstPage.drawText(String(amount_words), {
          x: 80,
          y: height - 480,
          size: 8,
          font: helveticaFont,
        })
        firstPage.drawText(String(sgst), {
            x: width - 90,
            y: height - 470 ,
            size: 9,
            font: helveticaFont,
        })
        firstPage.drawText(String(cgst), {
            x: width - 90,
            y: height - 490 ,
            size: 9,
            font: helveticaFont,
        })
        firstPage.drawText(String(amount), {
            x: width - 100,
            y: height - 565 ,
            size: 13,
            font: helveticaFont,
        })

        for(let i=0;i<bill.length;i++){
            let itm = bill[i];
            firstPage.drawText(String(i+1), {
                x: 25,
                y: height - 300 - 15*(i+1),
                size: 11,
                font: helveticaFont,
            })
            firstPage.drawText(String(itm.item), {
                x: 45,
                y: height - 300  - 15*(i+1),
                size: 11,
                font: helveticaFont,
            })
            firstPage.drawText(String(itm.wt), {
                x: width - 250,
                y: height - 300  - 15*(i+1),
                size: 11,
                font: helveticaFont,
            })
            firstPage.drawText(String(itm.rate), {
                x: width - 180,
                y: height - 300 - 15*(i+1),
                size: 11,
                font: helveticaFont,
            })
            firstPage.drawText(String(itm.mkg + "%"), {
                x: width - 130,
                y: height - 300 - 15*(i+1) ,
                size: 11,
                font: helveticaFont,
            })
            firstPage.drawText(String(itm.amount), {
                x: width - 60,
                y: height - 300 - 15*(i+1) ,
                size: 11,
                font: helveticaFont,
            })
        }
      
        const pdfBytesModified = await pdfDoc.save()
        res.send(Buffer.from(pdfBytesModified));
        
    }
  }
