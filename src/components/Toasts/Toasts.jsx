import { useContext } from 'react';
import { Toast } from '@openedx/paragon';

import { ToastsContext } from './ToastsProvider';

const Toasts = () => {
  const { toasts, removeToast } = useContext(ToastsContext);
  return toasts.map(({ id, message }) => (
    <Toast
      key={id}
      onClose={() => removeToast(id)}
      show
    >
      {message}
    </Toast>
  ));
};

export default Toasts;
