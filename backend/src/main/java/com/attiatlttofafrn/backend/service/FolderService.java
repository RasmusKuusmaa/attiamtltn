package com.attiatlttofafrn.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.attiatlttofafrn.backend.model.Folder;
import com.attiatlttofafrn.backend.model.User;
import com.attiatlttofafrn.backend.repository.FolderRepository;

@Service
public class FolderService {

    private final FolderRepository folderRepository;

    public FolderService(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    public List<Folder> getFoldersForUser(User user) {
        return folderRepository.findByUser(user);
    }

    public Folder createFolder(User user, String title, Integer folderType) {
        Folder folder = new Folder();
        folder.setUser(user);
        folder.setTitle(title);
        folder.setFolderType(folderType);
        return folderRepository.save(folder);
    }
}
