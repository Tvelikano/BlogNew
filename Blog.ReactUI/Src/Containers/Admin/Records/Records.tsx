import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as recordActions from "Actions/RecordActions";
import { IStoreState } from "Types/Index";
import ListViewModel from "Types/ListViewModel";
import ReturnModelDTO from "Types/ReturnModelDTO";
import RecordDTO from "Types/RecordDTO";
import React from "react";
import queryString from "querystring";
import SearchQuery from "Types/SearchQuery";
import { Link } from "react-router-dom";
import { allowOnlyAdmin } from "Hocs/AllowOnlyAdmin";
import RecordStateDTO from "Types/RecordStateDTO";
import PagingHelper from "Components/Helpers/PagingHelper";
import SearchHelper from "Components/Helpers/SearchHelper";

interface IProps {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  isLoading: boolean;
  location: {
    search: string;
  };
  GetRecords: (searchQuery: SearchQuery) => void;
  AddRecord: (data: RecordDTO) => void;
  DeleteRecord: (id: number) => void;
}

class AdminRecords extends React.Component<IProps> {
  public componentDidMount() {
    const { location, GetRecords: GetRecords } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    GetRecords(search);
  }

  public componentDidUpdate() {
    const { data, location, isLoading, GetRecords } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    if (
      !isLoading &&
      (search.Page != data.PageInfo.CurrentPage ||
        search.SearchString != data.SearchString)
    ) {
      GetRecords(search);
    }
  }

  public render() {
    const { data, DeleteRecord } = this.props;

    return (
      <>
        <Link className="btn btn-primary" to="/Admin/Records/Add">
          Create New Record
        </Link>

        <SearchHelper />
        {data.List ? (
          <>
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
                  <tr key={item.Model.RecordId}>
                    <td>{item.Model.RecordId}</td>
                    <td>{item.Model.Name}</td>
                    <td>{item.Model.Content}</td>
                    <td>{RecordStateDTO[item.Model.State]}</td>
                    <td>{item.Model.CreateDate}</td>
                    <td>
                      <Link
                        to={`Records/Edit/${item.Model.RecordId}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => DeleteRecord(item.Model.RecordId)}
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
        ) : null}
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
    GetRecords: async (searchQuery: SearchQuery) =>
      await dispatch(recordActions.GetRecords(searchQuery)),

    AddRecord: async (data: RecordDTO) =>
      await dispatch(recordActions.AddRecord(data)),

    DeleteRecord: async (id: number) =>
      await dispatch(recordActions.DeleteRecord(id)),
  };
}

export default allowOnlyAdmin(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminRecords)
);
