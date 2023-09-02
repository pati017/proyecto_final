# proyecto_final
REPOSITORIO: https://github.com/pati017/proyecto_final.git

En la carpeta postman se encuentran todas los endpoints para usuarios:

• --Para crear un usuario POST ‘/usuarios’
• --Para listar a todos lo usuarios: GET ‘/usuarios’
• --Para listar un usuario en especifico GET ‘/ usuarios/:id_usuario’
• --Para actualizar los datos de un usuario: PUT ‘/ usuarios/:id_usuario’
• --Para eliminar a un usuario: DELETE ‘usuarios/:id_usuario’
• --Para mostrar el promedio de edades de los usuarios: GET ‘/usuarios/promedio-edad’
• --Para mostrar la version del api rest: GET ‘/estado’

la base de datos se encuentra publicado en un servidor. https://api.elephantsql.com/
------------------------------------------------------------------------------------

--tabla usada:

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id serial NOT NULL,
    nombre character varying(250) COLLATE pg_catalog."default",
    primer_apellido character varying(200) COLLATE pg_catalog."default",
    segundo_apellido character varying(200) COLLATE pg_catalog."default",
    cedula_identidad character varying(60) COLLATE pg_catalog."default",
    fecha_nacimiento date,
    estado integer,
    fecha_reg timestamp without time zone,
    fecha_mod timestamp without time zone,
    CONSTRAINT usuario_pkey PRIMARY KEY (id)
);

INSERT INTO public.usuarios (nombre,primer_apellido,segundo_apellido,cedula_identidad,fecha_nacimiento,estado,fecha_reg)
	VALUES ('PATRICIA','CASTRO','CARMEN','12345','2000-10-01',1,'2023-08-30 19:31:01.183');
INSERT INTO public.usuarios (nombre,primer_apellido,segundo_apellido,cedula_identidad,fecha_nacimiento,estado,fecha_reg)
	VALUES ('DIOGENES','MARCIAL','BUSTAMANTE','5687987','1990-03-01',1,'2023-08-30 19:36:12.916');
INSERT INTO public.usuarios (nombre,primer_apellido,segundo_apellido,cedula_identidad,fecha_nacimiento,estado,fecha_reg)
	VALUES ('ALBERTO','MARQUEZ','ZARATE','6123564','1980-05-18',1,'2023-08-30 19:36:45.536');
INSERT INTO public.usuarios (nombre,primer_apellido,segundo_apellido,cedula_identidad,fecha_nacimiento,estado,fecha_reg,fecha_mod)
	VALUES ('JUAN','QUISPE','TADEO','61235468','1988-06-04',1,'2023-08-30 15:19:48.352','2023-08-30 19:37:22.385');
INSERT INTO public.usuarios (nombre,primer_apellido,segundo_apellido,cedula_identidad,fecha_nacimiento,estado,fecha_reg)
	VALUES ('MARIA','ANTONIA','GUTIERREZ','19888744','1972-02-18',1,'2023-08-30 19:38:41.245');
INSERT INTO public.usuarios (nombre,primer_apellido,segundo_apellido,cedula_identidad,fecha_nacimiento,estado,fecha_reg)
	VALUES ('NIVER','MALDONADO','GUTIERREZ','1897854','1922-06-18',1,'2023-08-30 19:40:18.442');

