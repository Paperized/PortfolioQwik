export interface PreviewPostFields {
  id: number;
  title: string;
  timestamp: Date;
  preview_image: string;
  preview_content: string;
}

export interface PostFields extends PreviewPostFields {
  content: string;
}

export class PreviewPost implements PreviewPostFields {
  constructor() {
    this.id = 0;
    this.preview_content = '';
    this.preview_image = '';
    this.timestamp = new Date();
    this.title = '';
  }

  id: number;
  preview_content: string;
  preview_image: string;
  timestamp: Date;
  title: string;
}

export class Post extends PreviewPost implements PostFields {
  constructor() {
    super();
    this.content = '';
  }

  content: string;
}