import { connect } from "react-redux";
import * as actions from "Actions/RecordActions";
import { ThunkDispatch } from "redux-thunk";
import RecordDTO from "Types/RecordDTO";
import React from "react";
import { Link } from "react-router-dom";
import RecordStateDTO from "Types/RecordStateDTO";
import SearchQuery from "Types/SearchQuery";
import { IStoreState } from "Types/Index";
import ListViewModel from "Types/ListViewModel";
import ReturnModelDTO from "Types/ReturnModelDTO";

interface IProps {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  isLoading: boolean;
  updateRecord: (data: RecordDTO) => void;
  match: {
    params: {
      id: number;
    };
  };
}

class Edit extends React.Component<IProps> {
  private name = React.createRef<HTMLInputElement>();
  private content = React.createRef<HTMLTextAreaElement>();
  private recordState = React.createRef<HTMLSelectElement>();

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    const data = this.props.data.List.find(
      item => item.Model.RecordId == this.props.match.params.id
    ).Model;

    data.Name = this.name.current!.value;
    data.Content = this.content.current!.value;
    data.State =
      RecordStateDTO[
        this.recordState.current!.value as keyof typeof RecordStateDTO
      ];

    this.props.updateRecord(data);
  };

  public render() {
    const record = this.props.data.List.find(
      item => item.Model.RecordId == this.props.match.params.id
    ).Model;

    return (
      <>
        <h4>Edit Record</h4>

        <form className="add" onSubmit={this.handleSubmit}>
          <div className="form-group">
            Name:
            <div className="col-md-10">
              <input
                required
                className="form-control"
                ref={this.name}
                defaultValue={record.Name}
              />
            </div>
          </div>

          <div className="form-group">
            Content:
            <div className="col-md-10">
              <textarea
                required
                className="form-control"
                ref={this.content}
                defaultValue={record.Content}
              />
            </div>
          </div>

          <div className="form-group">
            State:
            <select
              name="State"
              ref={this.recordState}
              defaultValue={RecordStateDTO[record.State]}
            >
              {Object.keys(RecordStateDTO)
                .filter(x => isNaN(Number(x)))
                .map(item => (
                  <option key={item}>{item}</option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <div className="col-md-10">
              <input type="submit" value="Post" className="btn btn-primary" />
            </div>
          </div>
        </form>

        <Link to={window.location.href} className="btn btn-danger">
          Cancel
        </Link>
      </>
    );
  }
}

function mapStateToProps({ records }: IStoreState) {
  return {
    data: records.data,
    error: records.error,
    isLoading: records.isLoading,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, actions.RecordActions>
) {
  return {
    updateRecord: async (data: RecordDTO) =>
      await dispatch(actions.UpdateRecord(data)),

    getRecord: async (id: number) =>
      await dispatch(
        actions.GetRecords(Object.assign(new SearchQuery(), { PageSize: 1 }))
      ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Edit);
