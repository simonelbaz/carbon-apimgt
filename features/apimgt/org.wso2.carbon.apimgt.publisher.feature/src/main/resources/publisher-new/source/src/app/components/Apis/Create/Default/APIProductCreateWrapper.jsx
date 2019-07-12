/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from 'AppData/api.js';
import Alert from 'AppComponents/Shared/Alert';
import APICreateDefault from './APICreateDefault';

/**
 * Wrapper for API create component. this wrapper is used when creating
 * an API
 */
class APIProductCreateWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api: new API(),
            valid: {
                name: { empty: false, alreadyExists: false },
                context: { empty: false, alreadyExists: false },
                version: { empty: false },
                endpoint: { empty: false },
            },
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }
    /**
     * Create API product
     * @param {*} e
     */
    handleSubmit(e) {
        e.preventDefault();
        const { api: currentAPI } = this.state;
        if (!currentAPI.name || !currentAPI.context) {
            // Checking the api name,context undefined or empty states
            this.setState((oldState) => {
                const { valid, api } = oldState;
                const validUpdated = valid;
                validUpdated.name.empty = !api.name;
                validUpdated.context.empty = !api.context;
                return { valid: validUpdated };
            });
            return;
        }
        currentAPI.saveProduct()
            .then((newAPI) => {
                const redirectURL = '/api-products/' + newAPI.id + '/overview';
                Alert.info(`${newAPI.name} created.`);
                this.props.history.push(redirectURL);
            })
            .catch((error) => {
                console.error(error);
                if (error.response) {
                    Alert.error(error.response.body.message);
                } else {
                    Alert.error(`Something went wrong while creating ${currentAPI.name}`);
                }
            });
    }
    /**
     * Change input
     * @param {any} e Synthetic React Event
     * @memberof APICreateForm
     */
    inputChange({ target }) {
        const { name, value } = target;
        this.setState(({ api, valid }) => {
            const changes = api;
            if (name === 'endpoint') {
                changes[name] = [
                    {
                        inline: {
                            name: `${api.name}_inline_production`,
                            endpointConfig: {
                                list: [
                                    {
                                        url: value,
                                        timeout: '1000',
                                    },
                                ],
                                endpointType: 'SINGLE',
                            },
                            endpointSecurity: {
                                enabled: false,
                                type: 'basic',
                                username: 'basic',
                                password: 'basic',
                            },
                            type: 'http',
                        },
                        type: 'production_endpoints',
                    },
                    {
                        inline: {
                            name: `${api.name}_inline_sandbox`,
                            endpointConfig: {
                                list: [
                                    {
                                        url: value,
                                        timeout: '1000',
                                    },
                                ],
                                endpointType: 'SINGLE',
                            },
                            endpointSecurity: {
                                enabled: false,
                                type: 'basic',
                                username: 'basic',
                                password: 'basic',
                            },
                            type: 'http',
                        },
                        type: 'sandbox_endpoints',
                    },
                ];
            } else {
                changes[name] = value;
            }
            // Checking validity.
            const validUpdated = valid;
            validUpdated.name.empty = !api.name;
            validUpdated.context.empty = !api.context;
            validUpdated.version.empty = !api.version;
            validUpdated.endpoint.empty = !api.endpoint;
            // TODO we need to add the already existing error for (context)
            // by doing an api call ( the swagger definition does not contain such api call)
            return { api: changes, valid: validUpdated };
        });
    }
    /**
     * @inheritDoc
     */
    render() {
        return (<APICreateDefault
            api={this.state.api}
            handleSubmit={this.handleSubmit}
            inputChange={this.inputChange}
            isAPIProduct
            valid={this.state.valid}
        />);
    }
}

APIProductCreateWrapper.propTypes = {
    classes: PropTypes.shape({}).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    type: PropTypes.shape({}).isRequired,
    valid: PropTypes.shape({}).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }).isRequired,
};
export default APIProductCreateWrapper;