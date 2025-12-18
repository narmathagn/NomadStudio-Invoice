import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-invoice-template',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './invoice-template.component.html',
    styleUrl: './invoice-template.component.css'
})
export class InvoiceTemplateComponent implements OnChanges {
    @Input() invoice: any;

    displayServices: any[] = [];
    amountInWords: string = '';

    ngOnChanges(changes: SimpleChanges) {
        if (changes['invoice'] && this.invoice) {
            this.prepareDisplayData();
            this.amountInWords = this.numberToWords(this.invoice.totalAmount || 0);
        }
    }

    prepareDisplayData() {
        // Clone services to avoid mutating original input
        this.displayServices = this.invoice.services ? [...this.invoice.services] : [];

        // Ensure minimum rows for PDF layout (Requirement: at least 5 empty rows)
        const minRows = 5;
        const currentCount = this.displayServices.length;
        if (currentCount < minRows) {
            const diff = minRows - currentCount;
            for (let i = 0; i < diff; i++) {
                this.displayServices.push({ isEmpty: true });
            }
        }
    }

    numberToWords(amount: number): string {
        if (amount === 0) return 'Zero Rupees Only';

        const words = [
            '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
            'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
        ];
        const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

        const numString = Math.floor(amount).toString();
        const parts = numString.split('.');
        let integerPart = parseInt(parts[0]);

        if (integerPart === 0) return 'Zero Rupees Only';

        const convertGroup = (n: number): string => {
            if (n < 20) return words[n];
            const digit = n % 10;
            const ten = Math.floor(n / 10);
            return tens[ten] + (digit ? ' ' + words[digit] : '');
        };

        const convertRecursive = (n: number): string => {
            if (n < 100) return convertGroup(n);
            if (n < 1000) return words[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + convertRecursive(n % 100) : '');
            if (n < 100000) return convertRecursive(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + convertRecursive(n % 1000) : '');
            if (n < 10000000) return convertRecursive(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + convertRecursive(n % 100000) : '');
            return convertRecursive(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + convertRecursive(n % 10000000) : '');
        };

        return convertRecursive(integerPart) + ' Rupees Only';
    }
}
