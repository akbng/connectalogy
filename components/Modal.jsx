import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";

import styles from "../styles/Modal.module.css";

const Modal = ({ children, isOpen, setOpen }) => {
  const closeModal = () => setOpen(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={styles.dialog} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter={styles.transition_enter}
          enterFrom={styles.opacity0}
          enterTo={styles.opacity1}
          leave={styles.transition_leave}
          leaveFrom={styles.opacity1}
          leaveTo={styles.opacity0}
        >
          <div className={styles.backdrop} />
        </Transition.Child>

        <div className={styles.dialog_wrapper}>
          <div className={styles.dialog_inner_wrapper}>
            <Transition.Child
              as={Fragment}
              enter={styles.transition_enter}
              enterFrom={[styles.opacity0, styles.scale_down].join(" ")}
              enterTo={[styles.opacity1, styles.scale_base].join(" ")}
              leave={styles.transition_leave}
              leaveFrom={[styles.opacity1, styles.scale_base].join(" ")}
              leaveTo={[styles.opacity0, styles.scale_down].join(" ")}
            >
              <Dialog.Panel>{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Modal;
