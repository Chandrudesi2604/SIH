import React, { useState } from 'react';
import { PortalDocument } from '../../types';
import {
  FileText,
  Download,
  Upload,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Plus,
  FileCheck,
  ExternalLink,
} from 'lucide-react';

interface DocumentsViewProps {
  documents: PortalDocument[];
  onUploadDocument: (doc: PortalDocument) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  documents,
  onUploadDocument,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PortalDocument['category']>('Transcript');
  const [newVerifiedBy, setNewVerifiedBy] = useState('NIT Trichy Academic Cell');

  const categories = ['All', 'Transcript', 'NOC', 'Internship Certificate', 'MoU', 'Resume'];

  const filtered = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'All' || doc.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newDoc: PortalDocument = {
      id: `doc-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      uploadedDate: new Date().toISOString().split('T')[0],
      fileSize: '1.2 MB',
      verifiedBy: newVerifiedBy,
      status: 'Pending Review',
    };

    onUploadDocument(newDoc);
    setShowUploadModal(false);
    setNewTitle('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-stone-900 font-serif">Verified Document Depository</h1>
            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" /> AICTE DigiLocker Certified
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Tamper-proof storage for university transcripts, internship NOCs, and industry MoUs.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 bg-[#0c2f21] hover:bg-[#14532d] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Upload className="w-4 h-4 text-amber-400" />
          Upload New Document
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search documents by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-700 text-stone-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/80">
                  <FileText className="w-5 h-5" />
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    doc.status === 'Verified'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 flex items-center gap-1'
                      : 'bg-amber-50 text-amber-800 border-amber-200 flex items-center gap-1'
                  }`}
                >
                  {doc.status === 'Verified' ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </>
                  ) : (
                    <>
                      <Clock className="w-3 h-3 text-amber-600" />
                      Pending Review
                    </>
                  )}
                </span>
              </div>

              <h3 className="font-bold text-sm text-stone-900 line-clamp-2">{doc.title}</h3>
              <p className="text-xs text-stone-500 mt-1">Authority: {doc.verifiedBy}</p>

              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                <span>{doc.category}</span>
                <span>•</span>
                <span>{doc.fileSize}</span>
                <span>•</span>
                <span>{doc.uploadedDate}</span>
              </div>
            </div>

            <div className="pt-4 mt-2 flex items-center gap-2">
              <button
                onClick={() => alert(`Downloading verified document: ${doc.title} (PDF SHA-256 Hash verified)`)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold border border-stone-200 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-stone-600" />
                Download PDF
              </button>
              <button
                onClick={() => alert(`Certificate ID: ${doc.id}\nVerification Authority: ${doc.verifiedBy}\nTamper-proof National Academic Registry (SIH 26044)`)}
                className="p-2 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200 text-xs cursor-pointer"
                title="Verify Certificate Signature"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 text-xs sm:text-sm">
            <h3 className="text-lg font-bold text-stone-900 font-serif mb-1">
              Upload Official Document
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Documents will be routed to the Dean / AICTE node for cryptographic signature.
            </p>

            <form onSubmit={handleUpload} className="space-y-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 6th Semester Marksheet / AICTE Internship NOC"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Document Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs bg-white"
                >
                  <option value="Transcript">Transcript</option>
                  <option value="NOC">NOC</option>
                  <option value="Internship Certificate">Internship Certificate</option>
                  <option value="MoU">MoU</option>
                  <option value="Resume">Resume</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1 text-xs">Issuing / Verifying Node</label>
                <input
                  type="text"
                  value={newVerifiedBy}
                  onChange={(e) => setNewVerifiedBy(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 text-stone-900 text-xs"
                />
              </div>

              {/* Drag and Drop Box Simulator */}
              <div className="p-4 border-2 border-dashed border-stone-300 rounded-xl text-center bg-stone-50">
                <FileCheck className="w-8 h-8 text-stone-400 mx-auto mb-1" />
                <p className="text-xs font-semibold text-stone-700">Drag &amp; drop PDF or click to browse</p>
                <p className="text-[11px] text-stone-400">PDF, PNG or JPG up to 15MB</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-lg cursor-pointer"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
