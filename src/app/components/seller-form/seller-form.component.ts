import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import {Seller} from '../../shared/models/seller.entity';
import {environment} from '../../shared/environment';

@Component({
  selector: 'app-seller-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-form.component.html',
  styleUrl: './seller-form.component.css'
})
export class SellerFormComponent {
  seller: any = {
    id: uuidv4(),
    price: { amount: '', quantity: '' },
    images: []
  };
  secretKey = environment.secretKey

  imageInput = '';
  customKey = '';
  customValue = '';
  customFields: { key: string, value: string }[] = [];

  mainFields = [
    'title', 'price', 'location', 'description', 'categories', 'build_type',
    'material', 'company_website', 'company_name', 'contact_number',
    'gst_verified', 'youtube_video', 'youtube_channel', 'map', 'images'
  ];

  addImage() {
    if (this.imageInput) {
      this.seller.images.push(this.imageInput.trim());
      this.imageInput = '';
    }
  }

  removeImage(index: number) {
    this.seller.images.splice(index, 1);
  }

  addCustomField() {
    if (this.customKey && this.customValue) {
      this.customFields.push({ key: this.customKey, value: this.customValue });
      this.customKey = '';
      this.customValue = '';
    }
  }

  removeCustomField(key: string) {
    this.customFields = this.customFields.filter(f => f.key !== key);
  }

  copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
    alert('Copied to clipboard!');
  }

// Add this method to your component
  xorEncode(input: string, key: string): string {
    return btoa([...input].map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
    ).join(''));
  }

  copyFinalObject() {
    const finalObject: any = {
      id: this.seller.id,
      images: this.seller.images
    };

    for (const field of this.mainFields) {
      const val = this.seller[field];

      if (field === 'price' && val.amount && val.quantity) {
        finalObject.price = val;
      } else if (field === 'contact_number' && val) {
        // ✅ Encode contact_number
        const secretKey = this.secretKey; // Replace with your secure key
        finalObject.contact_number = this.xorEncode(val, secretKey);
      } else if (field !== 'price' && field !== 'images' && val !== undefined && val !== '') {
        finalObject[field] = val;
      }
    }

    for (const custom of this.customFields) {
      finalObject[custom.key] = custom.value;
    }

    this.copyToClipboard(JSON.stringify(finalObject, null, 2));
  }
}
