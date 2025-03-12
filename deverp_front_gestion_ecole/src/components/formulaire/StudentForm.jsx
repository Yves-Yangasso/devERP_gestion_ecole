import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input/InputField";
import SelectInput from "../ui/Input/SelectInput";
import NavigationButtons from "../ui/Button/NavigationButtons";
import { useFormContext } from "../../context/FormContext";
import { validateName, validateDate, validateEmail, validateSelect, validateRequired } from "../../utils/validators";
import AlertService from "../../services/notifications/AlertService";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import useCountryList from 'react-select-country-list';
import useCrud from '../../hooks/useCrudAxios';

const StudentForm = () => {
  const { updateStudent, formState } = useFormContext();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(formState.student.telephone || "");
  const countryList = useCountryList();

  // API Calls
  const filiereCrud = useCrud('filiere');
  const niveauCrud = useCrud('niveaux-etudes');
  const formationCrud = useCrud('formations');

  // State for storing data
  const [niveaux, setNiveaux] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    const fetchNiveaux = async () => {
      const data = await niveauCrud.get();
      setNiveaux(data || []);
    };
    fetchNiveaux();
  }, []);

  useEffect(() => {
    const fetchFilieres = async () => {
      const data = await filiereCrud.get();
      setFilieres(data || []);
    };
    fetchFilieres();
  }, []);

  useEffect(() => {
    const fetchFormations = async () => {
      const data = await formationCrud.get();
      setFormations(data || []);
    };
    fetchFormations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateStudent({ [name]: value || "" });
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value || "");
    updateStudent({ telephone: value || "" });
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    const errors = {};

    const requiredFields = [
      "prenom", "nom", "date", "lieu", "adresse", "email", "telephone",
      "nationalite", "universite", "niveau", "filiere", "formations", "dernierDiplome"
    ];

    requiredFields.forEach((field) => {
      if (!formState.student[field] || formState.student[field] === "" || formState.student[field] === undefined) {
        errors[field] = `${field} est requis`;
      }
    });

    if (!formState.student.telephone || formState.student.telephone.trim() === "") {
      errors.telephone = "Le numéro de téléphone est requis";
    }

    console.log("FormState après validation :", formState.student);

    if (Object.keys(errors).length > 0) {
      AlertService.error("Veuillez remplir tous les champs", errors);
      updateStudent({ errors });
    } else {
      navigate("/TuteurInfos");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">INFORMATION ÉTUDIANT</h2>
      <form className="flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1">
          <Input label="Prénom" name="prenom" placeholder="Saisissez votre prénom" value={formState.student.prenom || ""} onChange={handleChange} validate={validateName} />
          <Input label="Nom" name="nom" placeholder="Saisissez votre nom" value={formState.student.nom || ""} onChange={handleChange} validate={validateName} />
          <Input label="Date de Naissance" name="date" type="date" value={formState.student.date || ""} onChange={handleChange} validate={validateDate} />
          <Input label="Lieu de Naissance" name="lieu" placeholder="Saisissez votre lieu de naissance" value={formState.student.lieu || ""} onChange={handleChange} validate={validateRequired} />
          <Input label="Adresse" name="adresse" placeholder="Saisissez votre adresse" value={formState.student.adresse || ""} onChange={handleChange} validate={validateRequired} />
          <Input label="Email" name="email" type="email" placeholder="Saisissez votre email" value={formState.student.email || ""} onChange={handleChange} validate={validateEmail} />
          <Input label="Dernier Diplôme" name="dernierDiplome" placeholder="Saisissez votre dernier diplôme" value={formState.student.dernierDiplome || ""} onChange={handleChange} validate={validateRequired} />
          <Input label="Dernier Établissement" name="universite" placeholder="Saisissez votre dernier établissement" value={formState.student.universite || ""} onChange={handleChange} validate={validateRequired} />
          <div className="mb-4">
            <label htmlFor="telephone" className="block mb-2 text-[#333] text-sm">
              Téléphone <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              international
              defaultCountry="SN"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className="w-full p-3 border border-[#ddd] rounded-lg text-sm"
              name="telephone"
              id="telephone"
              placeholder="Entrez votre numéro de téléphone"
            />
          </div>
    

          <SelectInput label="Nationalité" name="nationalite" options={countryList.getData()} value={formState.student.nationalite} onChange={handleChange} validate={validateSelect} />

          <SelectInput label="Niveau" name="niveau" options={niveaux.map(n => ({ value: n.id, label: n.nom }))} value={formState.student.niveau || ""} onChange={handleChange} validate={validateSelect} />

          <SelectInput label="Filière" name="filiere" options={filieres.map(f => ({ value: f.id, label: f.nom }))} value={formState.student.filiere || ""} onChange={handleChange} validate={validateSelect} />

          <SelectInput label="Formation" name="formations" options={formations.map(f => ({ value: f.id, label: f.nom }))} value={formState.student.formations || ""} onChange={handleChange} validate={validateSelect} />
        </div>

        <NavigationButtons onNextClick={handleNextClick} nextText="Suivant" />
      </form>
    </div>
  );
};

export default StudentForm;
