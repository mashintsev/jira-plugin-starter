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
  @Path("render")
  @Produces("text/html; charset=UTF-8")
  public String render(@QueryParam("path") String path) throws IOException {
    return templateAdapterService.renderTemplate(path);
  }
}
