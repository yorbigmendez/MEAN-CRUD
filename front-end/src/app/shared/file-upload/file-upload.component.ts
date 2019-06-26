import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() fileType = 'image/*'; // File type to permit
  @Input() imageSrc = 'assets/profile-template.jpg';
  @Input() viewMode = false;
  ngOnInit() {
  }

  /**
   * Handles the file changes
   * @param e Event
   */
  handleFileChange(e) {
    // Determine how change occured
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    // const pattern = /image png, image jpeg/;
    const reader = new FileReader();
    // On load => handle the event
    reader.onload = this._handleFileLoaded.bind(this);
    reader.readAsDataURL(file); // Start to read the content
  }
  // Handle event when reader is loaded completely
  _handleFileLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
  }

}
