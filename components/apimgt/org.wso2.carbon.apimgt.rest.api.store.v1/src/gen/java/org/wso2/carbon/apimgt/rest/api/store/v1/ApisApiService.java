package org.wso2.carbon.apimgt.rest.api.store.v1;

import org.wso2.carbon.apimgt.rest.api.store.v1.*;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.*;

import org.wso2.carbon.apimgt.rest.api.store.v1.dto.ErrorDTO;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.CommentDTO;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.CommentListDTO;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.DocumentDTO;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.DocumentListDTO;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.APIDTO;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.RatingListDTO;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.RatingDTO;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.APIListDTO;

import java.util.List;

import java.io.InputStream;
import org.apache.cxf.jaxrs.ext.multipart.Attachment;

import javax.ws.rs.core.Response;

public abstract class ApisApiService {
    public abstract Response apisApiIdCommentsCommentIdDelete(String commentId,String apiId,String ifMatch,String ifUnmodifiedSince);
    public abstract Response apisApiIdCommentsCommentIdGet(String commentId,String apiId,String ifNoneMatch,String ifModifiedSince);
    public abstract Response apisApiIdCommentsCommentIdPut(String commentId,String apiId,CommentDTO body,String ifMatch,String ifUnmodifiedSince);
    public abstract Response apisApiIdCommentsGet(String apiId,Integer limit,Integer offset);
    public abstract Response apisApiIdCommentsPost(String apiId,CommentDTO body);
    public abstract Response apisApiIdDocumentsDocumentIdContentGet(String apiId,String documentId,String ifNoneMatch,String ifModifiedSince);
    public abstract Response apisApiIdDocumentsDocumentIdGet(String apiId,String documentId,String ifNoneMatch,String ifModifiedSince);
    public abstract Response apisApiIdDocumentsGet(String apiId,Integer limit,Integer offset,String ifNoneMatch);
    public abstract Response apisApiIdGet(String apiId,String ifNoneMatch,String ifModifiedSince);
    public abstract Response apisApiIdRatingsGet(String apiId,Integer limit,Integer offset);
    public abstract Response apisApiIdRatingsRatingIdGet(String apiId,String ratingId,String ifNoneMatch,String ifModifiedSince);
    public abstract Response apisApiIdSdksLanguageGet(String apiId,String language);
    public abstract Response apisApiIdSwaggerGet(String apiId,String ifNoneMatch,String ifModifiedSince);
    public abstract Response apisApiIdUserRatingPut(String apiId,RatingDTO body);
    public abstract Response apisApiIdWsdlGet(String apiId,String label,String ifNoneMatch,String ifModifiedSince);
    public abstract Response apisGet(Integer limit,Integer offset,String labels,String query,String ifNoneMatch);
}
