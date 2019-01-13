import ListViewModel from "Types/ListViewModel";
import ReturnModelDTO from "Types/ReturnModelDTO";
import RecordDTO from "Types/RecordDTO";
import React from "react";
import queryString from "querystring";
import { Link } from "react-router-dom";
import SearchHelper from "Components/Helpers/SearchHelper";
import PagingHelper from "Components/Helpers/PagingHelper";
import Record from "Components/records/Record";
import CommentDTO from "Types/CommentDTO";
import SearchQuery from "Types/SearchQuery";
import Carousel from "Components/Carousel";

interface IProps {
  isAuthenticated: boolean;
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  isLoading: boolean;
  isCommentsLoading: boolean;
  location: {
    search: string;
  };
  GetRecords: (searchQuery: SearchQuery) => void;
  GetComments: (id: number) => void;
  CreateComment: (data: CommentDTO) => void;
  ShowComments: (id: number) => void;
}

export default class Blog extends React.Component<IProps> {
  public componentDidMount() {
    const { location, GetRecords } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    GetRecords(search);
  }

  public componentDidUpdate(prevProps: IProps) {
    const {
      data,
      location,
      isLoading,
      GetRecords,
      isAuthenticated,
    } = this.props;

    let search = Object.assign(new SearchQuery(), (queryString.parse(
      location.search.replace("?", "")
    ) as any) as SearchQuery);

    if (
      isAuthenticated !== prevProps.isAuthenticated ||
      (!isLoading &&
        (search.Page != data.PageInfo.CurrentPage ||
          search.SearchString != data.SearchString))
    ) {
      GetRecords(search);
    }
  }

  public render() {
    const {
      isAuthenticated,
      location,
      data,
      GetComments,
      CreateComment,
      ShowComments,
    } = this.props;

    return (
      <>
        <Carousel />

        <div className="container">
          <Link className="btn mb-2 btn-primary" to="/Add">
            Предложить свою новость
          </Link>

          <SearchHelper />

          {data.List.map(item => (
            <Record
              isAuthenticated={isAuthenticated}
              key={item.Model.RecordId}
              model={item}
              ShowComments={() => {
                ShowComments(item.Model.RecordId),
                  GetComments(item.Model.RecordId);
              }}
              CreateComment={(data: CommentDTO) => CreateComment(data)}
            />
          ))}

          <PagingHelper query={location.search} pagingInfo={data.PageInfo} />
        </div>
      </>
    );
  }
}
