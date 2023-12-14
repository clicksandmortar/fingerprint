import React from 'react';
import { DataCaptureTrigger, ModalProps } from '../Modal.types';
declare const DataCaptureModal: ({ handleCloseModal, trigger }: Omit<ModalProps<DataCaptureTrigger>, 'handleClickCallToAction'>) => React.JSX.Element;
export default DataCaptureModal;
