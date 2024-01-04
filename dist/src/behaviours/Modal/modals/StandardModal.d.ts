/**
 * Why is this modal standard?
 * Well, long ago, when we were young and naive, we thought that we could
 * make a modal that would work for all use cases. We were wrong.
 * We had to implement modals for each brand to prove we were better than a certain
 * competitor. We succeeded. This name remains as a reminder of a dark time in Difi's
 * history.
 */
import React from 'react';
import { ModalProps } from '../Modal.types';
declare function StandardModal({ trigger, handleClickCallToAction, handleCloseModal, }: ModalProps): React.JSX.Element | null;
export default StandardModal;
