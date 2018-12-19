import * as React from "react";
import CommentsContainer from "../containers/CommentsContainer";

interface IProps {
  model: ReturnModelDTO<RecordDTO>;
  showComments: () => void;
}

function Record({ model, showComments }: IProps) {
  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{model.Model.Name}</h4>
        <p className="card-text">{model.Model.Content}</p>
        <div className="float-right text-secondary small">
          {new Date(
            parseInt(/^\/Date\((.*?)\)\/$/.exec(model.Model.CreateDate)[1], 10)
          ).toUTCString()}
        </div>
        <div>
          <CommentsContainer
            count={model.Info}
            recordId={model.Model.RecordId}
            showComments={showComments}
          />
        </div>
      </div>
    </div>
  );
}

export default Record;
