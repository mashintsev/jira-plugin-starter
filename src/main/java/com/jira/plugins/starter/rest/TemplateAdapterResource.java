package com.jira.plugins.starter.rest;

import com.jira.plugins.starter.service.TemplateAdapterService;
import java.io.IOException;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

@Path("templates")
public class TemplateAdapterResource {

  private final TemplateAdapterService templateAdapterService;

  @Inject
  public TemplateAdapterResource(TemplateAdapterService templateAdapterService) {
    this.templateAdapterService = templateAdapterService;
  }

  @GET
  @Path("renderAsRenderer")
  @Produces("text/html; charset=UTF-8")
  public String renderAsRenderer(@QueryParam("path") String path) throws IOException {
    return templateAdapterService.renderTemplateAsAtlassianRenderer(path);
  }

  @GET
  @Path("renderAsVelocity")
  @Produces("text/html; charset=UTF-8")
  public String renderAsVelocity(@QueryParam("path") String path) throws IOException {
    return templateAdapterService.renderTemplateAsVelocityRenderer(path);
  }
}
