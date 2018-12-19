import * as React from "react";
import Record from "./Record";
import PagingHelper from "./PagingHelper";

interface IProps {
  data: ListViewModel<ReturnModelDTO<RecordDTO>>;
  isLoading: boolean;
  getRecords: (searchString: string, page: number) => void;
  showComments: (id: number) => void;
}

export default class Blog extends React.Component<IProps, object> {
  private search = React.createRef<HTMLInputElement>();

  public componentDidMount = () => {
    this.props.getRecords(
      this.props.data.SearchString,
      this.props.data.PageInfo.CurrentPage
    );
  };

  public render() {
    return <div className="news">{this.renderTemplate()}</div>;
  }

  private handleSubmit: React.ReactEventHandler<HTMLFormElement> = ev => {
    ev.preventDefault();

    this.props.getRecords(
      this.search.current!.value,
      this.props.data.PageInfo.CurrentPage
    );
  };

  private renderTemplate() {
    const { isLoading, data, showComments, getRecords } = this.props;
    let template;

    if (isLoading) {
      template = <p>Загрузка...</p>;
    } else {
      if (data.List.length) {
        template = (
          <div>
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  ref={this.search}
                  placeholder="Search..."
                  name="searchString"
                  defaultValue={data.SearchString}
                />
                <div className="input-group-append">
                  <input
                    type="submit"
                    className="btn btn-outline-info"
                    value="Search"
                  />
                </div>
              </div>
            </form>
            {data.List.map(item => (
              <div key={item.Model.RecordId}>
                <Record
                  model={item}
                  showComments={() => showComments(item.Model.RecordId)}
                />
              </div>
            ))}
            <PagingHelper
              pagingInfo={this.props.data.PageInfo}
              getRecords={(page: number) =>
                getRecords(this.props.data.SearchString, page)
              }
            />
          </div>
        );
      } else {
        template = <p> No Records Yet </p>;
      }
    }

    return template;
  }
}
