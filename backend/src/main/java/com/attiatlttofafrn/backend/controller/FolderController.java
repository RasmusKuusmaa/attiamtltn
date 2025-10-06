package com.attiatlttofafrn.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.attiatlttofafrn.backend.dto.Folder.FolderRequest;
import com.attiatlttofafrn.backend.dto.Folder.FolderResponse;
import com.attiatlttofafrn.backend.model.Folder;
import com.attiatlttofafrn.backend.service.FolderService;
import com.attiatlttofafrn.backend.service.UserService;

@RestController
@RequestMapping("api/user/folders")
public class FolderController {

    private final UserService userService;
    private final FolderService folderService;

    public FolderController(UserService userService, FolderService folderService) {
        this.userService = userService;
        this.folderService = folderService;
    }

    @GetMapping("")
    public ResponseEntity<?> getUserFolders(Authentication auth) {
        String email = auth.getName();
        return userService.findByEmail(email)
                .map(user -> ResponseEntity.ok(
                folderService.getFoldersForUser(user)
                        .stream()
                        .map(folder -> new FolderResponse(
                        folder.getFolder_id(),
                        folder.getTitle(),
                        folder.getFolderType()
                )).toList()
        )).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public ResponseEntity<?> addFolder(Authentication auth, @RequestBody FolderRequest request) {
        String email = auth.getName();

        return userService.findByEmail(email)
                .map(user -> {
                    Folder folder = folderService.createFolder(user, request.title(), request.folderType());
                    FolderResponse response = new FolderResponse(
                            folder.getFolder_id(),
                            folder.getTitle(),
                            folder.getFolderType()
                    );
                    return ResponseEntity.ok(response);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{folderId}")
    public ResponseEntity<?> deleteFolder(@PathVariable Long folderId) {
        if (folderService.deleteFolder(folderId)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
