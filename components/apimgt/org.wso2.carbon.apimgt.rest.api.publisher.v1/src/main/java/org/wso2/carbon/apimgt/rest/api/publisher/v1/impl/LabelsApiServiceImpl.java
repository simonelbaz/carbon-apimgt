package org.wso2.carbon.apimgt.rest.api.publisher.v1.impl;

import org.wso2.carbon.apimgt.rest.api.publisher.v1.*;
import org.wso2.carbon.apimgt.rest.api.publisher.v1.dto.*;


import org.wso2.carbon.apimgt.rest.api.publisher.v1.dto.ErrorDTO;
import org.wso2.carbon.apimgt.rest.api.publisher.v1.dto.LabelListDTO;

import java.util.List;

import java.io.InputStream;
import org.apache.cxf.jaxrs.ext.multipart.Attachment;

import javax.ws.rs.core.Response;

public class LabelsApiServiceImpl extends LabelsApiService {
    @Override
    public Response labelsGet(String ifNoneMatch,String ifModifiedSince,String labelType){
        // do some magic!
        return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!")).build();
    }
}