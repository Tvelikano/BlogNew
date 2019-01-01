import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as recordActions from "Actions/RecordActions";
import { IStoreState } from "Types/Index";
import ListViewModel from "Types/ListViewModel";
import ReturnModelDTO from "Types/ReturnModelDTO";
import RecordDTO from "Types/RecordDTO";
import React from "react";
import queryString from "querystring";
import SearchHelper from "Components/Helpers/SearchHelper";
import PagingHelper from "Components/Helpers/PagingHelper";
import SearchQuery from "Types/SearchQuery";
import { Link } from "react-router-dom";

interface IProps {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  isLoading: boolean;
  location: {
    search: string;
  };
  getRecords: (searchQuery: SearchQuery) => void;
  addRecord: (data: RecordDTO) => void;
  deleteRecord: (id: number) => void;
}

class AdminRecords extends React.Component<IProps> {
  public componentDidMount() {
    const { location, getRecords } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    getRecords(search);
  }

  public componentDidUpdate() {
    const { data, location, isLoading, getRecords } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    if (
      !isLoading &&
      (search.Page != data.PageInfo.CurrentPage ||
        search.SearchString != data.SearchString)
    ) {
      getRecords(search);
    }
  }

  public render() {
    const { location, data, deleteRecord } = this.props;

    return (
      <>
        <Link className="btn btn-primary" to="/Add">
          Create New Record
        </Link>

        <SearchHelper />
        <table className="table table-striped table-bordered table-hover">
          <tbody>
            <tr>
              <th>Record Id</th>
              <th>Title</th>
              <th>Content</th>
              <th>State</th>
              <th>Create Date</th>
              <th />
            </tr>

            {data.List.map(item => (
              <tr>
                <td>{item.Model.RecordId}</td>
                <td>{item.Model.Name}</td>
                <td>{item.Model.Content}</td>
                <td>{item.Model.State}</td>
                <td>{item.Model.CreateDate}</td>
                <td>
                  <Link
                    to={`Records/Edit/${item.Model.RecordId}`}
                    className="btn btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteRecord(item.Model.RecordId)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <PagingHelper query={location.search} pagingInfo={data.PageInfo} />
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
  dispatch: ThunkDispatch<{}, {}, recordActions.RecordActions>
) {
  return {
    getRecords: async (searchQuery: SearchQuery) =>
      await dispatch(recordActions.GetRecords(searchQuery)),

    addRecord: async (data: RecordDTO) =>
      await dispatch(recordActions.AddRecord(data)),

    deleteRecord: async (id: number) =>
      await dispatch(recordActions.DeleteRecord(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminRecords);
