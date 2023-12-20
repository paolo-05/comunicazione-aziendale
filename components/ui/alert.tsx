import React from "react";

interface OffcanvasAlertProps {
  alertType: string;
  show: boolean;
  message: string;
  onClose: () => void;
}

const OffcanvasAlert = ({
  alertType,
  show,
  message,
  onClose,
}: OffcanvasAlertProps) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className="offcanvas offcanvas-bottom show"
      tabIndex={-1}
      id="offcanvasAlert"
      aria-labelledby="offcanvasAlertLabel"
    >
      <div className="offcanvas-dialog">
        <div className="offcanvas-content">
          <div className="offcanvas-body">
            <div className={`alert alert-${alertType}`} role="alert">
              {message}
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                data-bs-dismiss="offcanvasAlert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasAlert;
