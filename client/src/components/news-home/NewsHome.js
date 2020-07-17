import React, { Component } from 'react'
import './NewsHome.css';
import loadingGif from '../../images/loading.gif';

// -- redux
import { connect } from 'react-redux'
import { getNews, toggleLoading, getSources } from '../../store/actions/news/news-actions';

import NewsContainer from '../news-container/NewsContainer';

import { OverlayTrigger, Tooltip, Button, Modal } from 'react-bootstrap';
import Axios from 'axios';

class NewsHome extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            modalShow: false,
            newSubscription: '',
            modalRemove: false,
            removeSubscription: ''
        }
    }

    componentDidMount() {
        const { id, getNews, toggleLoading, getSources } = this.props;
        toggleLoading();
        getNews(id);
        getSources();
    }

    addSubscription = () => {
        const { sources, id } = this.props;
        const { newSubscription } = this.state;
        if(sources) {
            const subscription = sources.filter((item) => item.title.includes(newSubscription))[0].id;
            if(subscription) {
                const data = {
                    sourceId: subscription,
                    userId: id 
                };
                Axios.patch('/news/add-subscription', data)
                  .then((res) => console.log(res.data))
                    .catch(() => {});
            }
        }
        this.setState({ modalShow: false });
    }

    removeSubscriptionFunc = () => {
        const { sources, id } = this.props;
        const { removeSubscription } = this.state;
        if(sources) {
            const subscription = sources.filter((item) => item.title.includes(removeSubscription))[0].id;
            if(subscription) {
                const data = {
                    sourceId: subscription,
                    userId: id 
                };
                Axios.patch('/news/remove-subscription', data)
                  .then((res) => console.log(res.data))
                    .catch(() => {});
            }
        }
        this.setState({ modalRemove: false });
    }

    render() {
        const { news, loading, sources } = this.props;
        const { modalShow, modalRemove } = this.state;
        const newsJournalsIDs = news && news.map((item) => item.journalID);
        const modalBody = (
            <div className="add-subscription">
                <label htmlFor="browser">Choose a journal :</label>
                <input list="browsers" name="browser" id="browser" 
                 onChange={(e) => this.setState({ newSubscription: e.target.value })} 
                 />

                <datalist id="browsers">
                    {
                        sources && sources.map((item) => newsJournalsIDs && newsJournalsIDs.includes(item.id) ? null : <option value={item.title} key={item.id} data-key={item.id} /> )
                    }
                </datalist>
            </div>
        );
        const removeBody = (
            <div className="add-subscription">
                <label htmlFor="browser">Choose a journal :</label>
                <input list="browsers" name="browser" id="browser" 
                 onChange={(e) => this.setState({ removeSubscription: e.target.value })} 
                 />

                <datalist id="browsers">
                    {
                        sources && sources.map((item) => newsJournalsIDs && newsJournalsIDs.includes(item.id) ? <option value={item.title} key={item.id} data-key={item.id} /> : null  )
                    }
                </datalist>
            </div>
        );
        return (
            <div className="news-home">
                <header>
                    <div className="">
                        <h1> Latest News </h1>
                        <span>  </span>
                    </div>
                    <div className="utils">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip>
                                    New subscription.
                                </Tooltip>
                            }
                        >
                                <i onClick={() => this.setState({ modalShow: true })} class="fas fa-plus"></i>
                        </OverlayTrigger>

                        <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip>
                                    Remove subscription.
                                </Tooltip>
                            }
                        >
                            <i onClick={() => this.setState({ modalRemove: true })} class="far fa-trash-alt"></i>
                        </OverlayTrigger>
                    </div>
                </header>
                <div className="container">
                    {
                        loading ? <img src={loadingGif} alt="Loading..."/> : <NewsContainer news={news} />
                    }
                </div>

                <Modal 
                show={modalShow}
                onHide={() => this.setState({ modalShow: false })}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                 centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title> New subscription. </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { modalBody }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ modalShow: false })}>
                            Close
                        </Button>
                        <Button variant="success" onClick={() => this.addSubscription()}>
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal 
                show={modalRemove}
                onHide={() => this.setState({ modalRemove: false })}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                 centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title> Remove subscription. </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { removeBody }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ modalRemove: false })}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => this.removeSubscriptionFunc()}>
                            Remove
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.user.data.id,
    news: state.news.news,
    loading: state.news.loading,
    sources: state.news.sources
});

export default connect(mapStateToProps, { getNews, toggleLoading, getSources })(NewsHome);