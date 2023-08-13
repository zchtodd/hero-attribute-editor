import React from 'react';

import r2wc from '@r2wc/react-to-web-component';
import AttributeEditor from './components/AttributeEditor';

const wcAttributeEditor = r2wc(AttributeEditor, { props: {} });

customElements.define("hero-attribute-editor", wcAttributeEditor);
