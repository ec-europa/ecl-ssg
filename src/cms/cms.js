import CMS from 'netlify-cms-app';
import { Control, Preview } from './components/ckeditor-netlify';
import PagePreview from './preview-templates/PagePreview';

CMS.registerWidget('ckeditor', Control, Preview);
CMS.registerPreviewTemplate('home', PagePreview);
CMS.registerPreviewTemplate('page', PagePreview);
CMS.registerPreviewTemplate('news', PagePreview);
CMS.registerPreviewTemplate('menu', PagePreview);
CMS.registerPreviewTemplate('footer', PagePreview);
CMS.init();
