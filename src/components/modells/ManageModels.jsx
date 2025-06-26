


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getModelThunk } from '../../redux/slices/getModelthunk';
import { getDetailingModelsThunk } from '../../redux/slices/getDetailingModelsThunk';
import { ShowDetailingModel } from './showDetaillingModel';
import { updateModelThunk } from '../../redux/slices/updateModelThunk';
import '../style/manageModels.css';
import { addModellThunk } from '../../redux/slices/addModelThunk';
import { Maneger } from '../homePage/manegar'
import { updateDetailingModelThunk } from '../../redux/slices/updateDetailingModelThunk';
import { addDetailingModelThunk } from '../../redux/slices/addDetailingModelThunk';
import { deleteDetailingModelThunk } from '../../redux/slices/deleteDetailingModelThunk';
import { DeleteModellThunk } from '../../redux/slices/DeleteModellThunk';

export const ManageModels = () => {
  const dispatch = useDispatch();
  const modells = useSelector(state => state.modellSlice.models);
  const eventDate = useSelector(state => state.schoolsSlice.dateOfEvent);
  // const schoolName = useSelector(state => state.schoolsSlice.school.name);
  const detailingModelsFromStore = useSelector(state => state.detailngModelsSlice.detailingModels);

  const [editingModel, setEditingModel] = useState(null);
  const [formData, setFormData] = useState({
    idModel: '',
    kategory: '',
    price: '',
    picture: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [detailingModels, setDetailingModels] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [editingDetail, setEditingDetail] = useState(null);
  const [addingDetail, setAddingDetail] = useState(false);
  const [detailFormData, setDetailFormData] = useState({
    idModel: '',
    size: '',
    countByDate: 0,
    count: 0
  });
  const [showModelForm, setShowModelForm] = useState(false); // רק כשמוסיפים דגם

  useEffect(() => {
    if (modells.length === 0) dispatch(getModelThunk());
  }, [dispatch, modells.length]);

  useEffect(() => {
    setDetailingModels(detailingModelsFromStore);
  }, [detailingModelsFromStore]);

  const openAddModel = () => {
    setEditingModel(null);
    setFormData({ idModel: '', kategory: '', price: '', picture: '' });
    setSelectedImage(null);
    setShowModelForm(true);
  };

  const openEditModel = (model) => {
    setEditingModel(model);
    setFormData({
      idModel: model.idModel,
      kategory: model.kategory,
      price: model.price,
      picture: model.picture
    });
    setSelectedImage(null);
    setShowModelForm(true);
  };

  const handleModelChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture' && files && files[0]) {
      setSelectedImage(files[0]);
      const fileUrl = URL.createObjectURL(files[0]);
      setFormData(prev => ({ ...prev, picture: fileUrl }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      setSnackbar({
        open: true,
        message: 'אנא בחר תמונה',
        severity: 'warning'
      });
      return null;
    }

    setUploadingImage(true);

    const formData1 = new FormData();
    formData1.append('file', selectedImage);

    try {
      const response = await fetch('https://localhost:5000/api/Img/upload', {
        method: 'POST',
        body: formData1,
      });

      if (!response.ok) {
        throw new Error(`שגיאת שרת: ${response.status}`);
      }

      const data = await response.json();
      setUploadingImage(false);

      setSnackbar({
        open: true,
        message: 'התמונה הועלתה בהצלחה',
        severity: 'success'
      });

      return data.imageUrl;
    } catch (error) {
      console.error("שגיאה בהעלאת תמונה:", error);
      setUploadingImage(false);
      setSnackbar({
        open: true,
        message: 'שגיאה בהעלאת התמונה',
        severity: 'error'
      });
      return null;
    }
  };

  const saveModel = async () => {
    if (!formData.idModel || !formData.kategory || !formData.price) {
      alert('אנא מלא את כל השדות של הדגם');
      return;
    }

    let imageUrl = formData.picture;
    if (selectedImage) {
      const uploadedUrl = await uploadImage();
      if (!uploadedUrl) return;
      imageUrl = uploadedUrl;
    }

    const productToAdd = {
      ...formData,
      picture: imageUrl
    };

    if (editingModel) {
      await dispatch(updateModelThunk(productToAdd));
    } else {
      await dispatch(addModellThunk(productToAdd));
    }

    await dispatch(getModelThunk());

    setEditingModel(null);
    setFormData({ idModel: '', kategory: '', price: '', picture: '' });
    setSelectedImage(null);
    setShowModelForm(false);
  };

  const deleteModel = async (idModel) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק דגם זה?')) {
      const resultAction = await dispatch(DeleteModellThunk(idModel));
      if (DeleteModellThunk.fulfilled.match(resultAction)) {
        await dispatch(getModelThunk());
      } else {
        alert('אירעה שגיאה במחיקת הדגם');
      }
    }
  };

  const openDetails = async (model) => {
    await dispatch(getDetailingModelsThunk({ id1: model.idModel, eventDate }));
    setSelectedModel(model);
    setShowDetailDialog(true);
    setEditingDetail(null);
    setAddingDetail(false);
    setDetailFormData({ idModel: model.idModel, size: '', countByDate: 0, count: 0,id:model.id });
  };

  const closeDetails = () => {
    setShowDetailDialog(false);
    setSelectedModel(null);
    setDetailingModels([]);
    setEditingDetail(null);
    setDetailFormData({ idModel: '', size: '', countByDate: 0, count: 0 ,id:0});
    setAddingDetail(false);
  };

  const openAddDetail = () => {
    setAddingDetail(true);
    setEditingDetail(null);
    setDetailFormData({ idModel: selectedModel.idModel, size: '', countByDate: 0, count: 0 ,id:0});
  };

  const openEditDetail = (detail) => {
    setEditingDetail(detail);
    setAddingDetail(false);
    setDetailFormData({
      idModel: detail.idModel,
      size: detail.size,
      countByDate: detail.countByDate,
      count: detail.count,
      id:detail.id
    });
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetailFormData(prev => ({ ...prev, [name]: name === 'size' ? value : Number(value) }));
  };

  const saveDetail = async () => {
    if (!detailFormData.size || detailFormData.countByDate < 0 || detailFormData.count < 0) {
      alert('אנא מלא את כל השדות של פרטי הדגם בצורה תקינה');
      return;
    }
    debugger
    // הוספת idModel לשיגור
    const detailToSave = {
      ...detailFormData,
      // idModel: selectedModel.idModel,
      // id:selectedModel.id
    };
if(editingDetail){
    await dispatch(updateDetailingModelThunk(detailToSave));
  }
if(addingDetail){
   await dispatch(addDetailingModelThunk(detailToSave));
}
   await dispatch(getDetailingModelsThunk({ id1: selectedModel.idModel, eventDate }));
    setEditingDetail(null);
    setAddingDetail(false);
    setDetailFormData({ idModel: selectedModel.idModel, size: '', countByDate: 0, count: 0 });
  };

  const deleteDetail = async (detail) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק פרטי דגם זה?')) {
      // debugger
      await dispatch(deleteDetailingModelThunk(detail.id));
      await dispatch(getDetailingModelsThunk({ id1: selectedModel.idModel, eventDate }));
    }
  };

  return (
    <div className="manage-models-container">
      {/* מנהל */}
      <Maneger></Maneger>

      <h1 className="manage-title">ניהול תלבושות</h1>

      <button className="btn-primary add-model-btn" onClick={openAddModel}>הוסף דגם חדש</button>

      {showModelForm && (
        <div className="model-form">
          <h2>{editingModel ? 'עריכת דגם' : 'הוספת דגם חדש'}</h2>
          <label>מספר דגם:</label>
          <input
            type="text"
            name="idModel"
            value={formData.idModel}
            onChange={handleModelChange}
            disabled={!!editingModel}
          />
          <label>קטגוריה:</label>
          <input
            type="text"
            name="kategory"
            value={formData.kategory}
            onChange={handleModelChange}
          />
          <label>מחיר:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleModelChange}
          />
          <label>תמונה:</label>
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleModelChange}
          />
          {formData.picture && (
            <img src={formData.picture} alt="תמונה לדגם" className="model-image-preview" />
          )}
          <div className="form-buttons">
            <button className="btn-primary" onClick={saveModel} disabled={uploadingImage}>
              {uploadingImage ? 'מעלה תמונה...' : 'שמור'}
            </button>
            <button className="btn-secondary" onClick={() => setShowModelForm(false)}>ביטול</button>
          </div>
        </div>
      )}

      <div className="models-list">
        {modells.length === 0 && <p>אין תלבושות להצגה</p>}
        {modells.map(model => (
          <div key={model.idModel} className="model-card">
            <div className="model-image" style={{ backgroundImage: `url(https://localhost:5000/img/${model.picture})` }} />
            <div className="model-info">
              <h3>דגם: {model.idModel}</h3>
              <p>קטגוריה: {model.kategory}</p>
              <p>מחיר: ₪{model.price}</p>
            </div>
            <div className="model-actions">
              <button className="btn-primary" onClick={() => openEditModel(model)}>עריכה</button>
              <button className="btn-secondary" onClick={() => deleteModel(model.idModel)}>מחיקה</button>
              <button className="btn-primary" onClick={() => openDetails(model)}>כמות במלאי </button>
            </div>
          </div>
        ))}
      </div>

      {showDetailDialog && (
        <>
          <div className="dialog-backdrop" onClick={closeDetails}></div>
          <dialog open className="detail-dialog enhanced-dialog">
            <div className="dialog-header">
              <h2>פרטי דגם: {selectedModel?.idModel}</h2>
              <button className="close-button" onClick={closeDetails}>✖</button>
            </div>
            <div className="dialog-content">
              <div className="detail-list">
                {detailingModels.length === 0 && !addingDetail && (
                  <>
                    <p>אין פרטי דגם להצגה</p>
                    <button className="btn-primary" onClick={openAddDetail}>הוסף פרטי דגם</button>
                  </>
                )}

                {(detailingModels.length > 0 || addingDetail) && (
                  <>
                    {detailingModels.map(detail => (
                      <div key={`${detail.idModel}-${detail.size}`} className="detail-item">
                        <div>
                          <strong>מידה:</strong> {detail.size}
                        </div>

                        <div>
                          <strong>כמות במלאי:</strong> {detail.count}
                        </div>
                        <div className="detail-actions">
                          <button className="btn-primary" onClick={() => openEditDetail(detail)}>עריכה</button>
                          <button className="btn-secondary" onClick={() => deleteDetail(detail)}>מחיקה</button>
                        </div>
                      </div>
                    ))}
                    <button className="btn-primary add-detail-btn" onClick={openAddDetail}>הוסף פרטי דגם</button>
                  </>
                )}

                {(addingDetail || editingDetail) && (
                  <div className="detail-form">
                    <h3>{editingDetail ? 'עריכת פרטי דגם' : 'הוספת פרטי דגם'}</h3>
                    <label>מידה:</label>
                    <input
                      type="text"
                      name="size"
                      value={detailFormData.size}
                      onChange={handleDetailChange}
                    />
                    <label>כמות במלאי:</label>
                    <input
                      type="number"
                      name="count"
                      min="0"
                      value={detailFormData.count}
                      onChange={handleDetailChange}
                    />
                    {/* <label>כמות לפי תאריך אירוע:</label>
                    <input
                      type="number"
                      name="countByDate"
                      min="0"
                      value={detailFormData.countByDate}
                      onChange={handleDetailChange}
                    /> */}
                    <div className="form-buttons">
                      <button className="btn-primary" onClick={saveDetail}>שמור</button>
                      <button className="btn-secondary" onClick={() => {
                        setAddingDetail(false);
                        setEditingDetail(null);
                        setDetailFormData({ idModel: selectedModel.idModel, size: '', countByDate: 0, count: 0 });
                      }}>ביטול</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </dialog>
        </>
      )}
    </div>
  );
};
