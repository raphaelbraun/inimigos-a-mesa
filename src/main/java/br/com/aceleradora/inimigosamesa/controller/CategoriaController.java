package br.com.aceleradora.inimigosamesa.controller;

import br.com.aceleradora.inimigosamesa.dao.CategoriaRepository;
import br.com.aceleradora.inimigosamesa.model.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


import java.io.*;
import java.util.List;

@Controller
public class CategoriaController {

    @Autowired
    CategoriaRepository categoriaRepository;

    List<Categoria> listaCategoria;
    int codigo;

    @RequestMapping(value = "/cadastrarCategoria", method = RequestMethod.POST)
    public String cadastrar(Categoria categoria, Model model){

        if(codigo != 0) {
            categoria.setCodigo(codigo);
        }

        if (categoriaRepository.save(categoria) == null) {
            model.addAttribute("mensagemDeRetorno", "Não foi possivel cadastrar categoria");
        } else {
            model.addAttribute("mensagemDeRetorno", "Cadastro realizado com sucesso");
        }

        listaCategoria =  (List<Categoria>) categoriaRepository.findAll();

        model.addAttribute("categorias",listaCategoria);



        return "categoria";
    }

    @RequestMapping("/importaCategoria")
    public void importa() throws IOException {
        FileReader reader = new FileReader(new File("categorias_import_2.csv"));
        BufferedReader readr = new BufferedReader(reader);

        String linha = "";
        while((linha = readr.readLine()) != null){
            Categoria c = new Categoria();
            c.setNome(linha);
            System.out.println(">>> " + linha);
            categoriaRepository.save(c);
        }

    }


    @RequestMapping(value="/cadastrarCategoria", method = RequestMethod.GET)
    public String categoria(@RequestParam(value = "codigo", required = false) String codigo, Model model){;
        model.addAttribute("categoria", new Categoria());
        listaCategoria =  (List<Categoria>) categoriaRepository.findAll();
        model.addAttribute("categorias",listaCategoria);


        return "categoria";
    }

}


