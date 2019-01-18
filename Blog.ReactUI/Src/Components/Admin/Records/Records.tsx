import ListViewModel from "Types/ListViewModel";
import ReturnModel from "Types/ReturnModel";
import Record from "Types/Records/Record";
import React from "react";
import queryString from "querystring";
import SearchQuery from "Types/SearchQuery";
import { Link } from "react-router-dom";
import RecordState from "Types/Records/RecordState";
import PagingHelper from "Components/Helpers/PagingHelper";
import SearchHelper from "Components/Helpers/SearchHelper";

interface IProps {
  data: ListViewModel<ReturnModel<Record>>;
  isLoading: boolean;
  location: {
    search: string;
  };
  GetRecords: (searchQuery: SearchQuery) => void;
  AddRecord: (data: Record) => void;
  DeleteRecord: (id: number) => void;
}

export default class AdminRecords extends React.Component<IProps> {
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
      <div className="container">
        <Link className="btn btn-primary mt-2 mb-2" to="/Admin/Records/Add">
          Создать новую запись
        </Link>

        <SearchHelper />
        {data.List ? (
          <>
            <table className="table table-striped table-bordered table-hover">
              <tbody>
                <tr>
                  <th>ID записи</th>
                  <th>Заголовок</th>
                  <th>Основная часть</th>
                  <th>Кому видна</th>
                  <th>Дата создания</th>
                  <th />
                </tr>
                {data.List.map(item => (
                  <tr key={item.Model.RecordId}>
                    <td>{item.Model.RecordId}</td>
                    <td>{item.Model.Name}</td>
                    <td>{item.Model.Content}</td>
                    <td>{RecordState[item.Model.State]}</td>
                    <td>{item.Model.CreateDate}</td>
                    <td>
                      <Link
                        to={`Records/Edit/${item.Model.RecordId}`}
                        className="btn btn-primary m-1"
                      >
                        Редактировать
                      </Link>
                      <button
                        onClick={() => DeleteRecord(item.Model.RecordId)}
                        className="btn btn-danger m-1"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PagingHelper query={location.search} pagingInfo={data.PageInfo} />
          </>
        ) : null}
      </div>
    );
  }
}
