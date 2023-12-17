type ModalProps = {
  id: string;
  title: string;
  description: string;
  discardText: string;
  saveText: string;
  action: Function;
};

/**
 * This compnent 'extends' the classic Bootstrap providing a more dynamic way to customize and handles the confirm and discard actions
 * @param id a string that is unique to the modal
 * @param title a string for the heading of the modal
 * @param description the main content of the modal
 * @param discardText the text that will be contained in the discard button
 * @param saveText the text that will be contained in the confirm button
 * @param action a function that will be triggered when the confirm button is clicked
 */
export default function Modal({
  id,
  title,
  description,
  discardText,
  saveText,
  action,
}: ModalProps) {
  return (
    <div
      className="modal fade"
      tabIndex={-1}
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      aria-labelledby="modalDialog"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{description}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              {discardText}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                action(true);
              }}
            >
              {saveText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
