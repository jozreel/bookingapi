import React from 'react';
import $ from 'jquery';
class SearchResult extends React.Component {
    constructor() {
        super();
        let quer = this.props.searchString;
        let searchtype = this.props.searchType;
        this.state = {searchString:quer, searchType:searchtype};
    }
    componentDidMount()
    {

        $.ajax({
            url: '/user/'+this.props.searchString+'/'+this.props.searchtype,
            dataType: 'json',
            method: 'GET',
            beforeSend: function () {
                ;//startSpinner();

            },
            success: function (res) {
                if (res.length)
                    mp.setState({ searchres: res })

                //stopSpinner();
            }
        });

    }
     render() {
        return (<div>
            <div style={{ margin: '20px auto' }}>
                <ul style={{ listStyle: "none", marginRight: '20px' }}>
                    {this.state.searchres.map(function (r, indx) {
                        return (<li key={r._id} style={{ borderBottom: '1px solid #ccc', paddingBottom: '1  0px' }}>
                            <span onClick={this.handleBUsinessNameClick} style={{ fontSize: '16pt', color: '#1c629e', cursor: 'pointer' }}>{r.businessname}<input type="hidden" value={r._id} /></span>
                            <p style={{ margin: '0px', color: 'rgba(0,0,0,0.54)' }}>{r.street}, {r.businesstwn}, {r.country}</p>
                            <p style={{ margin: '0px', color: 'rgba(0,0,0,0.54)' }}>Services offered</p>
                            <ul style={{ listStyle: 'none' }}>
                                {r.jobs.map(function (s) {
                                    console.log(s);
                                    return (<li style={{ display: 'inline', marginRight: '10px', color: 'rgba(0,0,0,0.54)' }} key={s.jobid}>{s.jobname}</li>);
                                })}
                            </ul>
                        </li>);
                    }.bind(this))}
                </ul>
            </div>
        </div>
        );
    }
    handleBUsinessNameClick(e) {
        var jobid = '';
        var businessid = e.target.querySelector('input').value;
        jobid = "/" + document.querySelector('#jobid').value;

       // window.location = '/user/businesspage/' + businessid + jobid;
    }

}