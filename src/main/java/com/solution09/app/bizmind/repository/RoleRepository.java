package com.solution09.app.bizmind.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.solution09.app.bizmind.models.Role;
import com.solution09.app.bizmind.models.RoleName;


public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(RoleName name);
}