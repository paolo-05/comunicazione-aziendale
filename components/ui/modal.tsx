export default function Modal({
  id,
  title,
  description,
  discardText,
  saveText,
}: {
  id: string;
  title: string;
  description: string;
  discardText: string;
  saveText: string;
}) {
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
            <button type="button" className="btn btn-primary">
              {saveText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
