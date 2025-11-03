package com.jira.plugins.starter.repository;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.sal.api.transaction.TransactionCallback;
import com.jira.plugins.starter.model.Config;
import net.java.ao.Query;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConfigRepository {
  private final ActiveObjects ao;

  @Autowired
  public ConfigRepository(@ComponentImport ActiveObjects ao) {
    this.ao = ao;
  }

  @Nullable
  public Config getById(final int id) {
    return ao.executeInTransaction(() -> ao.get(Config.class, id));
  }

  public Config[] getConfigs() {
    return ao.executeInTransaction(() -> ao.find(Config.class, Query.select().order("ID ASC")));
  }

  public Config create(final String propertyKey, @Nullable final String propertyValue) {
    return ao.executeInTransaction(
        () -> {
          Config config = ao.create(Config.class);
          config.setPropertyKey(propertyKey);
          config.setPropertyValue(propertyValue);
          config.save();
          return config;
        });
  }

  public Config update(
      final int id, final String propertyKey, @Nullable final String propertyValue) {
    return ao.executeInTransaction(
        () -> {
          Config config = getById(id);
          if (config == null) {
            throw new IllegalArgumentException("Config with id " + id + " not found");
          }
          config.setPropertyKey(propertyKey);
          config.setPropertyValue(propertyValue);
          config.save();
          return config;
        });
  }

  public void delete(final int id) {
    ao.executeInTransaction(
        (TransactionCallback<Void>)
            () -> {
              ao.deleteWithSQL(Config.class, "ID = ?", id);
              return null;
            });
  }
}
